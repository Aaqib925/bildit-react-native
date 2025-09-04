import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useThemeStore } from '../store/theme';
import { CalendarDays, LayoutGrid, DollarSign } from 'lucide-react-native';

export type SortCriteria = 'date' | 'category' | 'amount';

interface SortControlsProps {
  currentSort: SortCriteria;
  onSortChange: (criteria: SortCriteria) => void;
}

interface SortButtonProps {
  title: string;
  icon: React.ElementType;
  isActive: boolean;
  isDarkMode: boolean;
  onPress: () => void;
}

const SortButton = ({ title, icon: Icon, isActive, isDarkMode, onPress }: SortButtonProps) => {
  const inactiveBg = isDarkMode ? 'bg-gray-800' : 'bg-gray-200';
  const inactiveText = isDarkMode ? 'text-gray-300' : 'text-gray-500';

  const buttonStyle = isActive ? 'bg-indigo-600' : inactiveBg;
  const textStyle = isActive ? 'text-white' : inactiveText;
  const iconColor = isDarkMode ? tw.color('gray-400') : tw.color('gray-500');
  const activeIconColor = tw.color('white');

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`flex-row items-center px-2.5 py-2 rounded-lg ${buttonStyle} ml-2`}
      activeOpacity={0.8}
    >
      <Icon size={16} color={isActive ? activeIconColor : iconColor} />
      <Text style={tw`font-semibold ml-1.5 ${textStyle} text-xs`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const SortControls = ({ currentSort, onSortChange }: SortControlsProps) => {
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === 'dark';

  const handlePress = (criteria: SortCriteria) => {
    onSortChange(criteria);
  };

  return (
    <View style={tw`flex-row justify-between items-center mb-4 px-1.5`}>
      <Text style={tw`text-base font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Sort by:
      </Text>
      <View style={tw`flex-row`}>
        <SortButton
          title="Date"
          icon={CalendarDays}
          isActive={currentSort === 'date'}
          isDarkMode={isDarkMode}
          onPress={() => handlePress('date')}
        />
        <SortButton
          title="Category"
          icon={LayoutGrid}
          isActive={currentSort === 'category'}
          isDarkMode={isDarkMode}
          onPress={() => handlePress('category')}
        />
        <SortButton
          title="Amount"
          icon={DollarSign}
          isActive={currentSort === 'amount'}
          isDarkMode={isDarkMode}
          onPress={() => handlePress('amount')}
        />
      </View>
    </View>
  );
};

export default React.memo(SortControls);

