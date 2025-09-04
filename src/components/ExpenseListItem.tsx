import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Expense } from '../store/expense/types';

interface ExpenseListItemProps {
  item: Expense;
  onPress: () => void;
}

const ExpenseListItem = ({ item, onPress }: ExpenseListItemProps) => {
  const formattedDate = new Date(item.date).toLocaleDateString();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={tw`bg-white p-4 rounded-xl shadow-sm mb-3`}>
      <View style={tw`flex-row justify-between items-center`}>
        <View style={tw`flex-1`}>
          <Text style={tw`text-lg font-bold text-gray-800`}>
            {item.description}
          </Text>
          <Text style={tw`text-sm text-gray-500 capitalize`}>
            {item.category}
          </Text>
        </View>
        <View style={tw`items-end`}>
          <Text style={tw`text-xl font-extrabold text-gray-900`}>
            ${item.amount.toFixed(2)}
          </Text>
          <Text style={tw`text-xs text-gray-400 mt-1`}>{formattedDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ExpenseListItem);
