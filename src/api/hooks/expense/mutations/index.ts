import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NewExpense, UpdatedExpense, useExpenseStore } from '../../../../store/expense';
import { EXPENSES_QUERY_KEY } from '../keys';
import { wait } from '../../../../utils/apiUtils';

/**
 * Custom hook for adding, updating, and deleting expenses.
 * It uses useMutation to handle the async operations and updates the query cache.
 */
export const useAddExpense = () => {
  const queryClient = useQueryClient();
  const { addExpense } = useExpenseStore();

  return useMutation({
    mutationFn: async (payload: NewExpense) => {
      await wait(1000);
      addExpense(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
    },
  });
};

/**
 * --- NEW: Hook for updating an expense ---
 */
export const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  const { updateExpense } = useExpenseStore();

  return useMutation({
    mutationFn: async (payload: UpdatedExpense) => {
      await wait(1000);
      updateExpense(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
    },
  });
};

/**
 * --- NEW: Hook for deleting an expense ---
 */
export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  const { deleteExpense } = useExpenseStore();

  return useMutation({
    mutationFn: async (payload: string) => { // payload is now just the ID
      await wait(1000);
      deleteExpense(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
    },
  });
};
