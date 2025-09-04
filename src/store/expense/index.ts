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
  addExpense: (expense: NewExpense) => void;
  updateExpense: (updatedExpense: UpdatedExpense) => void;
  deleteExpense: (id: string) => void;
  getExpenseById: (id: string) => Expense | undefined;
  clearAllExpenses: () => void;
}

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set, get) => ({
      expenses: [],

      /**
       * Adds a new expense to the store.
       * Uses Immer's `produce` for safe, immutable updates.
       * @param newExpense - The expense data without id and date.
       * @returns void
       */
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

      /**
       * Updates an existing expense.
       * Finds the expense by ID and merges the new data.
       * @param updatedExpense - The expense data with at least an id.
       * @returns void
       */
      updateExpense: (updatedExpense) => {
        set(
          produce((state: ExpenseState) => {
            const index = state.expenses.findIndex(
              (expense) => expense.id === updatedExpense.id,
            );
            if (index !== -1) {
              // Merge existing expense with updated fields
              state.expenses[index] = {
                ...state.expenses[index],
                ...updatedExpense,
              };
            }
          }),
        );
      },

      /**
       * Deletes an expense from the store by its ID.
       * @param id - The ID of the expense to delete.
       * @returns void
       */
      deleteExpense: (id) => {
        set(
          produce((state: ExpenseState) => {
            state.expenses = state.expenses.filter(
              (expense) => expense.id !== id,
            );
          }),
        );
      },

      /**
       * Retrieves a single expense by its ID.
       * This is a selector and doesn't modify state.
       * @param id - The ID of the expense to retrieve.
       * @returns The expense if found, otherwise undefined.
       */
      getExpenseById: (id: string) => {
        return get().expenses.find((expense) => expense.id === id);
      },

      /**
       * Clears all expenses from the store.
       * @returns void
       */
      clearAllExpenses: () => {
        set(
          produce((state: ExpenseState) => {
            state.expenses = [];
          }),
        );
      },
    }),
    {
      name: 'expense-storage-v1',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
