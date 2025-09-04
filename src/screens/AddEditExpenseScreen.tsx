import React from 'react';
import { View, Text } from 'react-native';
import { AddEditExpenseScreenProps } from '../navigation/types';
import tw from './../style/lib'

const AddEditExpenseScreen = ({ route }: AddEditExpenseScreenProps) => {
  const { expenseId } = route.params || {};
  const isEditing = !!expenseId;

  return (
    <View style={tw`flex-1 justify-center items-center p-4`}>
      <Text style={tw`text-2xl font-bold mb-2`}>
        {isEditing ? 'Edit Expense' : 'Add New Expense'}
      </Text>
      <Text style={tw`text-base text-gray-500`}>
        A form will go here to input expense details.
      </Text>
    </View>
  );
};

export default AddEditExpenseScreen;
