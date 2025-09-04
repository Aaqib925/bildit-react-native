/**
 * Expense Tracker App
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from './src/navigation/AppNavigator';
import { CUSTOM_DARK_THEME, CUSTOM_LIGHT_THEME } from './src/constants/theme';
import { useThemeStore } from './src/store/theme';
import { queryClient } from './src/services/react-query';

function App(): React.JSX.Element {
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === 'dark';

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer theme={isDarkMode ? CUSTOM_DARK_THEME : CUSTOM_LIGHT_THEME}>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;

