import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { AlertTriangle } from 'lucide-react-native';
import { useThemeStore } from '../store/theme';

interface AlertCardProps {
  message: string;
}

const AlertCard = ({ message }: AlertCardProps) => {
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === 'dark';

  const containerStyle = isDarkMode ? 'bg-red-900/50' : 'bg-red-100';
  const textStyle = isDarkMode ? 'text-red-300' : 'text-red-700';

  return (
    <View style={tw`${containerStyle} border-l-4 border-red-500 p-4 rounded-lg mb-4 flex-row items-center`}>
      <AlertTriangle size={24} color={tw.color('red-500')} />
      <Text style={tw`ml-3 text-base ${textStyle} font-semibold`}>
        {message}
      </Text>
    </View>
  );
};

export default AlertCard;

