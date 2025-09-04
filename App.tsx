/**
 * Expense Tracker App
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { RootNavigationRef } from './src/navigation/helpers/RootNavigation';
import { CUSTOM_DARK_THEME, CUSTOM_LIGHT_THEME } from './src/store/theme';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

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
