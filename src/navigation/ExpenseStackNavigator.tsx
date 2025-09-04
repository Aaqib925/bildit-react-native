import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ExpenseStackParamList } from './types';
import ExpenseListScreen from '../screens/ExpenseListScreen';
import AddEditExpenseScreen from '../screens/AddEditExpenseScreen';

const Stack = createStackNavigator<ExpenseStackParamList>();

const ExpenseStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ExpenseList"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ExpenseList" component={ExpenseListScreen} />
      <Stack.Screen name="AddEditExpense" component={AddEditExpenseScreen} />
    </Stack.Navigator>
  );
};

export default ExpenseStackNavigator;
