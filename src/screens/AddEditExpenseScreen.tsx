import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { AddEditExpenseScreenProps } from '../navigation/types';
import tw from 'twrnc';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAddExpense, useUpdateExpense, useDeleteExpense } from '../api/hooks/expense/mutations';
import AppButton from '../components/AppButton';
import AppHeader from '../components/AppHeader';
import AppTextInput from '../components/AppTextInput';
import { useExpenseStore } from '../store/expense';
import { useThemeStore } from '../store/theme';


const AddEditExpenseScreen = ({ route, navigation }: AddEditExpenseScreenProps) => {
  const { expenseId } = route.params || {};
  const isEditing = !!expenseId;

  const { getExpenseById } = useExpenseStore();
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === 'dark';

  const addMutation = useAddExpense();
  const updateMutation = useUpdateExpense();
  const deleteMutation = useDeleteExpense();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!description.trim()) newErrors.description = 'Description is required.';
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) newErrors.amount = 'Please enter a valid amount.';
    if (!category.trim()) newErrors.category = 'Category is required.';

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
      "Delete Expense",
      "Are you sure you want to delete this expense? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            deleteMutation.mutate(expenseId, { onSuccess: () => navigation.goBack() });
          },
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
      <KeyboardAwareScrollView contentContainerStyle={tw`p-6`}>
        <AppTextInput label="Description" value={description} onChangeText={setDescription} error={errors.description} />
        <AppTextInput label="Amount ($)" value={amount} onChangeText={setAmount} keyboardType="numeric" error={errors.amount} />
        <AppTextInput label="Category" value={category} onChangeText={setCategory} error={errors.category} />

        <View style={tw`mt-6`}>
          <AppButton
            variant='primary'
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
    </View>
  );
};

export default AddEditExpenseScreen;

