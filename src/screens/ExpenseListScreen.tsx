import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ExpenseListScreenProps } from '../navigation/types';
import tw from 'twrnc';
import AppButton from '../components/AppButton';
import AppHeader from '../components/AppHeader';
import ExpenseListItem from '../components/ExpenseListItem';
import SortControls, { SortCriteria } from '../components/SortControls';
import { useThemeStore } from '../store/theme';
import { Plus } from 'lucide-react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { useExpenses } from '../api/hooks/expense/queries';

type NavigationProp = ExpenseListScreenProps['navigation'];

const EmptyListComponent = React.memo(({ onPress }: { onPress: () => void }) => {
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === 'dark';
  return (
    <View style={tw`flex-1 justify-center items-center mt-20`}>
      <Text style={tw`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>No expenses yet. Let's add one!</Text>
      <AppButton title="Add First Expense" onPress={onPress} />
    </View>
  );
});


const ExpenseListScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { data: expenses = [], refetch, isFetching } = useExpenses();
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === 'dark';

  const [sortCriteria, setSortCriteria] = useState<SortCriteria>('date');

  const sortedExpenses = useMemo(() => {
    return [...expenses].sort((a, b) => {
      switch (sortCriteria) {
        case 'category': return a.category.localeCompare(b.category);
        case 'amount': return b.amount - a.amount;
        case 'date':
        default: return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  }, [expenses, sortCriteria]);

  const handleNavigateToAdd = useCallback(() => {
    navigation.navigate('AddEditExpense', {});
  }, [navigation]);

  const handleNavigateToEdit = useCallback((expenseId: string) => {
    navigation.navigate('AddEditExpense', { expenseId });
  }, [navigation]);

  const renderEmptyList = useCallback(() => (
    <EmptyListComponent onPress={handleNavigateToAdd} />
  ), [handleNavigateToAdd]);


  return (
    <View style={tw`flex-1 ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
      <AppHeader title="My Expenses" />
      <FlatList
        data={sortedExpenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseListItem item={item} onPress={() => handleNavigateToEdit(item.id)} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isFetching} // The spinner is visible when fetching
            onRefresh={refetch}     // Call the refetch function on pull
            tintColor={isDarkMode ? tw.color('gray-400') : tw.color('gray-600')}
          />
        }
        ListHeaderComponent={<SortControls currentSort={sortCriteria} onSortChange={setSortCriteria} />}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={tw`p-4 pb-24`}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.fabContainer}>
        <AppButton
          title=""
          onPress={handleNavigateToAdd}
          style={[styles.fab, tw`bg-indigo-600`]}
          tStyle={tw`text-white`}
        >
          <Plus size={20} color="white" />
        </AppButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default ExpenseListScreen;
