import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { AddEditExpenseScreenProps } from '../navigation/types';
import tw from 'twrnc';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CategoryModal from '../components/modal/CategoryModal';
import AddCategoryModal from '../components/modal/AddCategoryModal';
import { useThemeStore } from '../store/theme';
import { useAddExpense, useDeleteExpense, useUpdateExpense } from '../api/hooks/expense/mutations';
import { useExpenseStore } from '../store/expense';
import AppHeader from '../components/AppHeader';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';

const AddEditExpenseScreen = ({ route, navigation }: AddEditExpenseScreenProps) => {
  const { expenseId } = route.params || {};
  const isEditing = !!expenseId;

  const { getExpenseById, expenses, categories: userCategories, addCategory } = useExpenseStore();
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === 'dark';

  const addMutation = useAddExpense();
  const updateMutation = useUpdateExpense();
  const deleteMutation = useDeleteExpense();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [isCategoryListVisible, setCategoryListVisible] = useState(false);
  const [isAddCategoryVisible, setAddCategoryVisible] = useState(false);

  const categoryItems = useMemo(() => {
    const categoriesSet = new Set([
      'Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health',
      ...userCategories,
      ...expenses.map(e => e.category.trim()).filter(Boolean)
    ]);
    return Array.from(categoriesSet).sort((a, b) => a.localeCompare(b));
  }, [expenses, userCategories]);

  useEffect(() => {
    if (isEditing) {
      const expenseToEdit = getExpenseById(expenseId);
      if (expenseToEdit) {
        setDescription(expenseToEdit.description);
        setAmount(expenseToEdit.amount.toString());
        setCategory(expenseToEdit.category);
      }
    }
  }, [expenseId, isEditing, getExpenseById]);

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setCategoryListVisible(false);
  };

  const handleAddCategory = useCallback((newCategoryName: string) => {
    const trimmedName = newCategoryName.trim();
    if (trimmedName) {
      addCategory(trimmedName);
      setCategory(trimmedName);
      setAddCategoryVisible(false);
    }
  }, [addCategory]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!description.trim()) newErrors.description = 'Description is required.';
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) newErrors.amount = 'Please enter a valid amount.';
    if (!category) newErrors.category = 'Please select a category.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    const onSaveSuccess = () => navigation.goBack();
    if (isEditing && expenseId) {
      updateMutation.mutate(
        { id: expenseId, description, amount: parseFloat(amount), category },
        { onSuccess: onSaveSuccess }
      );
    } else {
      addMutation.mutate(
        { description, amount: parseFloat(amount), category },
        { onSuccess: onSaveSuccess }
      );
    }
  };

  const handleDelete = () => {
    if (!isEditing || !expenseId) return;
    Alert.alert(
      "Delete Expense", "Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => deleteMutation.mutate(expenseId, { onSuccess: () => navigation.goBack() }),
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={tw`flex-1 ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
      <AppHeader
        title={isEditing ? 'Edit Expense' : 'Add Expense'}
        canGoBack
        onBackPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView contentContainerStyle={tw`p-6`} keyboardShouldPersistTaps='handled'>
        <AppTextInput label="Description" value={description} onChangeText={setDescription} error={errors.description} />
        <AppTextInput label="Amount ($)" value={amount} onChangeText={setAmount} keyboardType="numeric" error={errors.amount} />
        
        <View style={tw`mb-4`}>
          <Text style={tw`text-base font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Category
          </Text>
          <TouchableOpacity
            onPress={() => setCategoryListVisible(true)}
            style={[styles.input, isDarkMode ? styles.inputDark : styles.inputLight]}
          >
            <Text style={tw`${category ? (isDarkMode ? 'text-white' : 'text-black') : 'text-gray-400'}`}>
              {category || 'Select a category...'}
            </Text>
          </TouchableOpacity>
          {errors.category && <Text style={tw`text-red-500 mt-1`}>{errors.category}</Text>}
        </View>

        <AppButton
          title="Add New Category"
          onPress={() => setAddCategoryVisible(true)}
          style={tw`mb-6`}
        />

        <View style={tw`mt-2`}>
          <AppButton
            title={isEditing ? 'Save Changes' : 'Add Expense'}
            onPress={handleSave}
            isLoading={addMutation.isPending || updateMutation.isPending}
          />
        </View>

        {isEditing && (
          <View style={tw`mt-4`}>
            <AppButton
              title="Delete Expense"
              variant="danger"
              onPress={handleDelete}
              isLoading={deleteMutation.isPending}
            />
          </View>
        )}
      </KeyboardAwareScrollView>
      
      <CategoryModal
        visible={isCategoryListVisible}
        categories={categoryItems}
        onClose={() => setCategoryListVisible(false)}
        onSelect={handleCategorySelect}
        isDarkMode={isDarkMode}
      />
      <AddCategoryModal
        visible={isAddCategoryVisible}
        onClose={() => setAddCategoryVisible(false)}
        onAddCategory={handleAddCategory}
        isDarkMode={isDarkMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 14, justifyContent: 'center' },
  inputLight: { borderColor: '#D1D5DB', backgroundColor: 'white' },
  inputDark: { borderColor: '#374151', backgroundColor: '#1F2937' },
});

export default AddEditExpenseScreen;

