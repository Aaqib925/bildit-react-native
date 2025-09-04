import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useThemeStore } from '../store/theme';
import { useExpenseStore } from '../store/expense';
import AppHeader from '../components/AppHeader';
import CategoryPieChart from '../components/CategoryPieChart';
import { subDays, isAfter } from 'date-fns';

type TimeRange = '7d' | '30d' | '90d' | 'all';

const AnalyticsScreen = () => {
  const theme = useThemeStore((state) => state.theme);
  const expenses = useExpenseStore((state) => state.expenses);
  const isDarkMode = theme === 'dark';
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');

  const timeRangeOptions: { value: TimeRange; label: string }[] = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: 'all', label: 'All Time' },
  ];

  const stats = useMemo(() => {
    let filteredExpenses = expenses;
    
    if (timeRange !== 'all') {
      const now = new Date();
      const daysToSubtract = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
      const startDate = subDays(now, daysToSubtract);
      filteredExpenses = expenses.filter(expense => 
        isAfter(new Date(expense.date), startDate)
      );
    }

    if (filteredExpenses.length === 0) {
      return {
        total: 0,
        avgDaily: 0,
        highestExpense: 0,
        totalTransactions: 0,
        topCategory: 'N/A'
      };
    }

    const total = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365;
    
    // Calculate category totals
    const categoryTotals = filteredExpenses.reduce((acc: { [key: string]: number }, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});
    
    const topCategory = Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A';

    return {
      total,
      avgDaily: total / days,
      highestExpense: Math.max(...filteredExpenses.map(e => e.amount)),
      totalTransactions: filteredExpenses.length,
      topCategory
    };
  }, [expenses, timeRange]);

  return (
    <View style={tw`flex-1 ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
      <AppHeader title="Analytics" />
      <ScrollView contentContainerStyle={tw`p-4 pb-20`}>
        {/* Time Range Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={tw`mb-4`}
          contentContainerStyle={tw`flex-row gap-2`}
        >
          {timeRangeOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => setTimeRange(option.value)}
              style={tw`px-4 py-2 rounded-full ${
                timeRange === option.value
                  ? isDarkMode ? 'bg-blue-600' : 'bg-indigo-500'
                  : isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <Text style={tw`text-sm font-medium ${
                timeRange === option.value
                  ? 'text-white'
                  : isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={tw`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-2xl mb-4`}>
          <Text style={tw`text-lg font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-4`}>
            Overview
          </Text>
          <View style={tw`flex-row flex-wrap -mx-2`}>
            <View style={tw`w-1/2 px-2 mb-4`}>
              <View style={tw`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-3 rounded-xl`}>
                <Text style={tw`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                  Total Spent
                </Text>
                <Text style={tw`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  ${stats.total.toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={tw`w-1/2 px-2 mb-4`}>
              <View style={tw`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-3 rounded-xl`}>
                <Text style={tw`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                  Avg. Daily
                </Text>
                <Text style={tw`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  ${stats.avgDaily.toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={tw`w-1/2 px-2`}>
              <View style={tw`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-3 rounded-xl`}>
                <Text style={tw`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                  Transactions
                </Text>
                <Text style={tw`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stats.totalTransactions}
                </Text>
              </View>
            </View>
            <View style={tw`w-1/2 px-2`}>
              <View style={tw`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-3 rounded-xl`}>
                <Text style={tw`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                  Top Category
                </Text>
                <Text style={tw`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stats.topCategory}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={tw`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-2xl mb-4`}>
          <Text style={tw`text-lg font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-4`}>
            Spending by Category
          </Text>
          <CategoryPieChart timeRange={timeRange} />
        </View>


      </ScrollView>
    </View>
  );
};

export default AnalyticsScreen;