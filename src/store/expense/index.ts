import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export interface Expense {
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
}

interface ExpenseState {
    expenses: Expense[];
    addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
    deleteExpense: (id: string) => void;
}

export const useExpenseStore = create<ExpenseState>()(
    persist(
        (set) => ({
            expenses: [],

            addExpense: (newExpense) => {
                set((state) => ({
                    expenses: [
                        ...state.expenses,
                        {
                            id: uuid.v4() as string,
                            date: new Date().toISOString(),
                            ...newExpense,
                        },
                    ],
                }));
            },

            deleteExpense: (id) => {
                set((state) => ({
                    expenses: state.expenses.filter((expense) => expense.id !== id),
                }));
            },
        }),
        {
            name: 'expense-storage',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
);
