import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { TrendingDown, TrendingUp } from 'lucide-react-native';
import { useThemeStore } from '../store/theme';
import { Expense } from '../store/expense/types';
import { HIGH_EXPENSE_THRESHOLD } from '../utils/globals';

interface ExpenseListItemProps {
  item: Expense;
  onPress: () => void;
}

const ExpenseListItem = ({ item, onPress }: ExpenseListItemProps) => {
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === 'dark';

  const formattedDate = new Date(item.date).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });

  const isHighExpense = item.amount >= HIGH_EXPENSE_THRESHOLD;

  const IconComponent = isHighExpense ? TrendingUp : TrendingDown;
  const iconColor = isHighExpense ? tw.color('red-500') : tw.color('green-500');

  const categoryBg = isDarkMode ? 'bg-gray-700' : 'bg-indigo-100';
  const categoryText = isDarkMode ? 'text-gray-300' : 'text-indigo-800';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={tw`p-4 rounded-2xl mb-3 flex-row items-center shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      
      <View style={tw`w-12 h-12 rounded-full items-center justify-center mr-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
         <IconComponent size={24} color={iconColor} />
      </View>

      <View style={tw`flex-1`}>
        <Text style={tw`text-base font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          {item.description}
        </Text>
        <View style={tw`flex-row items-center mt-1`}>
           <View style={tw`px-2 py-1 rounded-full ${categoryBg}`}>
              <Text style={tw`text-xs font-semibold ${categoryText}`}>{item.category}</Text>
           </View>
        </View>
      </View>

      <View style={tw`items-end`}>
        <Text style={tw`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          ${item.amount.toFixed(2)}
        </Text>
        <Text style={tw`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {formattedDate}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ExpenseListItem);
