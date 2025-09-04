import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import ExpenseListScreen from '../screens/ExpenseListScreen';
import AddEditExpenseScreen from '../screens/AddEditExpenseScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ExpenseList"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="ExpenseList"
        component={ExpenseListScreen}
        options={{ title: 'My Expenses' }}
      />
      <Stack.Screen
        name="AddEditExpense"
        component={AddEditExpenseScreen}
        options={({ route }) => ({
          title: route.params?.expenseId ? 'Edit Expense' : 'Add Expense',
          // presentation: 'modal',
          // gestureEnabled: true
        })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
