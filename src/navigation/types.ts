import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  ExpenseList: undefined; 
  AddEditExpense: { expenseId?: string }; 
};

export type ExpenseListScreenProps = StackScreenProps<
  RootStackParamList,
  'ExpenseList'
>;

export type AddEditExpenseScreenProps = StackScreenProps<
  RootStackParamList,
  'AddEditExpense'
>;
