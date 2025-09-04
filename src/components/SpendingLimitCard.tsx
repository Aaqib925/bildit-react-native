import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { useExpenseStore } from '../store/expense';
import { useThemeStore } from '../store/theme';
import AppTextInput from './AppTextInput';
import AppButton from './AppButton';

const SpendingLimitCard = () => {
  const { spendingLimit, setSpendingLimit } = useExpenseStore();
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === 'dark';

  const [limit, setLimit] = useState(spendingLimit?.toString() || '');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setLimit(spendingLimit?.toString() || '');
  }, [spendingLimit]);

  const handleSave = () => {
    const numericLimit = parseFloat(limit);
    if (!isNaN(numericLimit) && numericLimit > 0) {
      setSpendingLimit(numericLimit);
    } else {
      setSpendingLimit(null);
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <View style={tw`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <Text style={tw`text-lg font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-2`}>
        Monthly Spending Limit
      </Text>
      <Text style={tw`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
        Set a limit to get alerts when you're about to exceed your budget. Leave empty to disable.
      </Text>
      <AppTextInput
        label="Limit Amount ($)"
        placeholder="e.g., 500"
        value={limit}
        onChangeText={setLimit}
        keyboardType="numeric"
      />
      <AppButton
        title={isSaved ? "Saved!" : "Save Limit"}
        onPress={handleSave}
        disabled={isSaved}
      />
    </View>
  );
};

export default SpendingLimitCard;

