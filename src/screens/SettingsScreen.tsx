import React from 'react';
import { View, ScrollView } from 'react-native';
import tw from '../style/lib';
import { useThemeStore } from '../store/theme';
import AppHeader from '../components/AppHeader';
import SpendingLimitCard from '../components/SpendingLimitCard';


const SettingsScreen = () => {
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === 'dark';

  return (
    <View style={tw`flex-1 ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
      <AppHeader title="Settings" />
      <ScrollView contentContainerStyle={tw`p-4`}>
        <SpendingLimitCard />
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
