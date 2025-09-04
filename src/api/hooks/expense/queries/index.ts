import { useQuery } from '@tanstack/react-query';
import { EXPENSES_QUERY_KEY } from '../keys';
import { useExpenseStore } from '../../../../store/expense';
import { wait } from '../../../../utils/apiUtils';

/**
 * Custom hook to fetch all expenses.
 * It simulates an async API call to the Zustand store.
 */
export const useExpenses = () => {
  const expenses = useExpenseStore((state) => state.expenses);

  return useQuery({
    queryKey: EXPENSES_QUERY_KEY,
    queryFn: async () => {
      await wait(1200);
      return expenses;
    },
    initialData: expenses, 
  });
};