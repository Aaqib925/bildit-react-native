import React, { useMemo } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import tw from 'twrnc';
import { useExpenseStore } from '../store/expense';
import { useThemeStore } from '../store/theme';
import { format, subDays, startOfMonth, endOfMonth, eachMonthOfInterval, isWithinInterval, eachDayOfInterval } from 'date-fns';

interface MonthlyTrendChartProps {
  timeRange: '7d' | '30d' | '90d' | 'all';
}

const MonthlyTrendChart: React.FC<MonthlyTrendChartProps> = ({ timeRange }) => {
  const expenses = useExpenseStore((state) => state.expenses);
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === 'dark';
  
  // Get screen width for responsive chart sizing
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 64; // Accounting for padding

  const chartData = useMemo(() => {
    if (!expenses.length) return [];

    const now = new Date();
    
    if (timeRange === '7d') {
      // Show daily data for last 7 days
      const days = eachDayOfInterval({
        start: subDays(now, 6),
        end: now
      });
      
      return days.map(day => {
        const dayExpenses = expenses.filter(expense => 
          format(new Date(expense.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
        );
        const total = dayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        return {
          value: total,
          label: format(day, 'EEE'),
          dataPointText: total > 0 ? `$${total.toFixed(0)}` : '$0',
        };
      });
    }

    // For other time ranges, show different groupings
    let dataPoints = [];
    
    switch (timeRange) {
      case '30d':
        // Show weekly data for last 30 days
        const weeks = [];
        for (let i = 3; i >= 0; i--) {
          const weekStart = subDays(now, (i + 1) * 7 - 1);
          const weekEnd = subDays(now, i * 7);
          weeks.push({ start: weekStart, end: weekEnd });
        }
        
        dataPoints = weeks.map((week, index) => {
          const weekExpenses = expenses.filter(expense => {
            const expDate = new Date(expense.date);
            return expDate >= week.start && expDate <= week.end;
          });
          const total = weekExpenses.reduce((sum, exp) => sum + exp.amount, 0);
          return {
            value: total,
            label: `W${4 - index}`,
            dataPointText: `$${total.toFixed(0)}`,
          };
        });
        break;
        
      case '90d':
      case 'all':
        // Show monthly data
        let startDate: Date;
        if (timeRange === '90d') {
          startDate = subDays(now, 89);
        } else {
          if (expenses.length === 0) return [];
          const oldestExpense = expenses.reduce((oldest, expense) => {
            const expDate = new Date(expense.date);
            return expDate < oldest ? expDate : oldest;
          }, new Date());
          startDate = startOfMonth(oldestExpense);
        }

        const monthsToShow = eachMonthOfInterval({ start: startDate, end: now });
        
        dataPoints = monthsToShow.map(month => {
          const monthStart = startOfMonth(month);
          const monthEnd = endOfMonth(month);
          
          const monthExpenses = expenses.filter(expense => 
            isWithinInterval(new Date(expense.date), { start: monthStart, end: monthEnd })
          );
          
          const total = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
          
          return {
            value: total,
            label: format(month, 'MMM'),
            dataPointText: `$${total.toFixed(0)}`,
          };
        });
        break;
    }

    return dataPoints.length > 0 ? dataPoints : [];
  }, [expenses, timeRange]);

  if (!chartData.length) {
    return (
      <View style={tw`h-48 items-center justify-center`}>
        <Text style={tw`text-gray-500 dark:text-gray-400`}>
          No expense data to display.
        </Text>
      </View>
    );
  }

  // Calculate appropriate max value with padding
  const maxValue = Math.max(...chartData.map(d => d.value), 100);
  const yAxisMaxValue = maxValue === 0 ? 100 : maxValue * 1.2;

  // Calculate spacing based on data points
  const spacing = Math.floor((chartWidth - 60) / (chartData.length > 1 ? chartData.length - 1 : 1));

  return (
    <View style={tw`-ml-4`}>
      <LineChart
        data={chartData}
        width={chartWidth}
        height={200}
        color={isDarkMode ? '#3B82F6' : '#2563EB'}
        thickness={3}
        dataPointsColor={isDarkMode ? '#3B82F6' : '#2563EB'}
        dataPointsRadius={6}
        textColor={isDarkMode ? '#9CA3AF' : '#4B5563'}
        textFontSize={10}
        yAxisTextStyle={{ 
          color: isDarkMode ? '#9CA3AF' : '#4B5563',
          fontSize: 10,
        }}
        xAxisLabelTextStyle={{ 
          color: isDarkMode ? '#9CA3AF' : '#4B5563',
          fontSize: 10,
          width: 40,
          textAlign: 'center',
        }}
        startFillColor={isDarkMode ? '#3B82F6' : '#2563EB'}
        endFillColor={isDarkMode ? '#3B82F6' : '#2563EB'}
        startOpacity={0.4}
        endOpacity={0.1}
        backgroundColor="transparent"
        rulesColor={isDarkMode ? '#374151' : '#E5E7EB'}
        rulesType="solid"
        curved
        curvature={0.2}
        showVerticalLines={false}
        spacing={spacing}
        initialSpacing={30}
        endSpacing={30}
        maxValue={yAxisMaxValue}
        minValue={0}
        noOfSections={4}
        yAxisThickness={1}
        xAxisThickness={1}
        xAxisColor={isDarkMode ? '#374151' : '#E5E7EB'}
        yAxisColor={isDarkMode ? '#374151' : '#E5E7EB'}
        showDataPointOnPress
        showStripOnPress
        stripColor={isDarkMode ? '#4B5563' : '#D1D5DB'}
        pointerConfig={{
          showPointerStrip: true,
          pointerColor: isDarkMode ? '#3B82F6' : '#2563EB',
          pointerStripUptoDataPoint: true,
          pointerStripColor: isDarkMode ? '#4B5563' : '#D1D5DB',
          strokeDashArray: [2, 5],
          pointerLabelComponent: (items: any) => {
            return (
              <View style={tw`bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700`}>
                <Text style={tw`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {items[0]?.dataPointText || '$0'}
                </Text>
              </View>
            );
          },
        }}
        adjustToWidth
        areaChart
      />
    </View>
  );
};

export default MonthlyTrendChart;