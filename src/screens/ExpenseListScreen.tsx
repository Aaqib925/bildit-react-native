import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ExpenseListScreenProps } from '../navigation/types';
import tw from './../style/lib'
type NavigationProp = ExpenseListScreenProps['navigation'];

const ExpenseListScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={tw`flex-1 justify-center items-center p-4`}>
      <Text style={tw`text-2xl font-bold mb-2`}>Expense List Home</Text>
      <Text style={tw`text-base text-gray-600 mb-5`}>
        Your expenses will appear here.
      </Text>
      <Button
        title="Add New Expense"
        onPress={() => navigation.navigate('AddEditExpense', {})}
      />
    </View>
  );
};

export default ExpenseListScreen;
