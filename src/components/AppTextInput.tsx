import React from 'react';
import { TextInput as RNTextInput, TextInputProps, View, Text } from 'react-native';
import tw from 'twrnc';
import { useThemeStore } from '../store/theme';

interface AppTextInputProps extends TextInputProps {
  label: string;
  error?: string;
}

const AppTextInput = React.forwardRef<RNTextInput, AppTextInputProps>(
  ({ label, error, ...props }, ref) => {
    const theme = useThemeStore((state) => state.theme);
    const isDarkMode = theme === 'dark';

    const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';
    const labelColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';
    const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
    const borderColor = error ? 'border-red-500' : (isDarkMode ? 'border-gray-700' : 'border-gray-300');
    const placeholderColor = isDarkMode ? tw.color('gray-500') : tw.color('gray-400');

    return (
      <View style={tw`w-full mb-4`}>
        <Text style={tw`mb-2 text-base font-semibold ${labelColor}`}>{label}</Text>
        <RNTextInput
          ref={ref}
          style={tw`h-14 px-4 rounded-lg text-base w-full ${bgColor} ${textColor} ${borderColor} border`}
          placeholderTextColor={placeholderColor}
          {...props}
        />
        {error && <Text style={tw`mt-1 text-sm text-red-500`}>{error}</Text>}
      </View>
    );
  }
);

export default AppTextInput;

