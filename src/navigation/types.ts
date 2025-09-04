import { StackScreenProps } from '@react-navigation/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';

export type ExpenseStackParamList = {
  ExpenseList: undefined;
  AddEditExpense: { expenseId?: string };
};

export type RootTabParamList = {
  Expenses: NavigatorScreenParams<ExpenseStackParamList>; 
  Analytics: undefined;
};

// --- Prop Types for Screens ---

export type ExpenseListScreenProps = StackScreenProps<ExpenseStackParamList, 'ExpenseList'>;
export type AddEditExpenseScreenProps = StackScreenProps<ExpenseStackParamList, 'AddEditExpense'>;

export type AnalyticsScreenProps = BottomTabScreenProps<RootTabParamList, 'Analytics'>;

