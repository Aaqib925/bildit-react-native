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
import AppNavigator from './src/navigation/AppNavigator';
import { CUSTOM_DARK_THEME, CUSTOM_LIGHT_THEME } from './src/constants/theme';
import { useThemeStore } from './src/store/theme';
import { RootNavigationRef } from './src/navigation/helpers/RootNavigation';

function App(): React.JSX.Element {
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer ref={RootNavigationRef} theme={isDarkMode ? CUSTOM_DARK_THEME : CUSTOM_LIGHT_THEME}>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

