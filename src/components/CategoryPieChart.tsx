import React, { useMemo, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import tw from 'twrnc';
import { useExpenseStore } from '../store/expense';
import { useThemeStore } from '../store/theme';
import { subDays, isAfter } from 'date-fns';

const PIE_CHART_COLORS = [
    '#4F46E5', '#10B981', '#F59E0B', '#3B82F6', '#EC4899',
    '#8B5CF6', '#EF4444', '#6EE7B7', '#F97316', '#A855F7'
];

interface CategoryPieChartProps {
    timeRange?: '7d' | '30d' | '90d' | 'all';
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ timeRange = '30d' }) => {
    const expenses = useExpenseStore((state) => state.expenses);
    const theme = useThemeStore((state) => state.theme);
    const isDarkMode = theme === 'dark';

    const chartData = useMemo(() => {
        if (!expenses.length) return [];

        let filteredExpenses = expenses;

        if (timeRange !== 'all') {
            const now = new Date();
            const daysToSubtract = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
            const startDate = subDays(now, daysToSubtract);
            filteredExpenses = expenses.filter(expense =>
                isAfter(new Date(expense.date), startDate)
            );
        }

        const categoryTotals = filteredExpenses.reduce((acc: { [key: string]: number }, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {});

        return Object.entries(categoryTotals).map(([category, total], index) => ({
            value: total,
            label: category,
            text: `$${total.toFixed(0)}`,
            color: PIE_CHART_COLORS[index % PIE_CHART_COLORS.length],
            textColor: isDarkMode ? '#ffffff' : '#1f2937',
            focused: false,
        }));
    }, [expenses, timeRange, isDarkMode]);

    const totalSpending = useMemo(() => {
        return chartData.reduce((sum, item) => sum + item.value, 0);
    }, [chartData]);

    const centerLabelComponent = useCallback(() => (
        <View>
            <Text style={tw`text-2xl font-bold text-center ${isDarkMode ? 'text-black' : 'text-black'}`}>
                ${totalSpending.toFixed(2)}
            </Text>
            <Text style={tw`text-sm text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Spent
            </Text>
        </View>
    ), [totalSpending, isDarkMode]);

    const renderLegendComponent = useCallback(() => {
        return (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={tw`mt-4`}
                contentContainerStyle={tw`flex-row flex-wrap`}
            >
                {chartData.map((item, index) => (
                    <View key={index} style={tw`flex-row items-center mr-4 mb-2`}>
                        <View style={[tw`w-3 h-3 rounded-full mr-1`, { backgroundColor: item.color }]} />
                        <Text style={tw`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {item.label}: ${item.value.toFixed(0)}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        );
    }, [chartData, isDarkMode]);

    if (!chartData.length) {
        return (
            <View style={tw`h-48 items-center justify-center`}>
                <Text style={tw`text-gray-500 dark:text-gray-400`}>
                    No expense data to display.
                </Text>
            </View>
        );
    }

    return (
        <View style={tw`items-center`}>
            <PieChart
                data={chartData}
                donut
                radius={100}
                innerRadius={60}
                textColor={isDarkMode ? '#ffffff' : '#1f2937'}
                textSize={12}
                showText={false}
                focusOnPress
                centerLabelComponent={centerLabelComponent}
                showValuesAsLabels={false}
                strokeWidth={2}
                strokeColor={isDarkMode ? '#1f2937' : '#ffffff'}
            />
            {renderLegendComponent()}
        </View>
    );
};

export default CategoryPieChart;