import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { produce } from 'immer';
import { Expense } from './types';

export type NewExpense = Omit<Expense, 'id' | 'date'>;
export type UpdatedExpense = Partial<Omit<Expense, 'id'>> & { id: string };

interface ExpenseState {
  expenses: Expense[];
  categories: string[];
  addExpense: (expense: NewExpense) => void;
  updateExpense: (updatedExpense: UpdatedExpense) => void;
  deleteExpense: (id: string) => void;
  getExpenseById: (id: string) => Expense | undefined;
  addCategory: (category: string) => void;
}

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set, get) => ({
      expenses: [],
      categories: [],

      addExpense: (newExpense) => {
        set(
          produce((state: ExpenseState) => {
            state.expenses.push({
              id: uuid.v4() as string,
              date: new Date().toISOString(),
              ...newExpense,
            });
          }),
        );
      },

      updateExpense: (updatedExpense) => {
        set(
          produce((state: ExpenseState) => {
            const index = state.expenses.findIndex(
              (expense) => expense.id === updatedExpense.id,
            );
            if (index !== -1) {
              state.expenses[index] = {
                ...state.expenses[index],
                ...updatedExpense,
              };
            }
          }),
        );
      },

      deleteExpense: (id) => {
        set(
          produce((state: ExpenseState) => {
            state.expenses = state.expenses.filter(
              (expense) => expense.id !== id,
            );
          }),
        );
      },

      getExpenseById: (id: string) => {
        return get().expenses.find((expense) => expense.id === id);
      },


      addCategory: (newCategory) => {
        set(
          produce((state: ExpenseState) => {
            const trimmedCategory = newCategory.trim();
            const lowerCaseCategories = state.categories.map(c => c.toLowerCase());
            if (trimmedCategory && !lowerCaseCategories.includes(trimmedCategory.toLowerCase())) {
              state.categories.push(trimmedCategory);
            }
          })
        )
      },
    }),
    {
      name: 'expense-storage-v1',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

