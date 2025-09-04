import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from './types';
import tw from 'twrnc';
import { Home, PieChart } from 'lucide-react-native';

import ExpenseStackNavigator from './ExpenseStackNavigator';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import { useThemeStore } from '../store/theme';

const Tab = createBottomTabNavigator<RootTabParamList>();

const renderExpensesIcon = (props: { focused: boolean; color: string; size: number }) => (
  <Home {...props} strokeWidth={props.focused ? 2.5 : 2} />
);
const renderAnalyticsIcon = (props: { focused: boolean; color: string; size: number }) => (
  <PieChart {...props} strokeWidth={props.focused ? 2.5 : 2} />
);

const TabNavigator = () => {
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === 'dark';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tw.color('indigo-600'),
        tabBarInactiveTintColor: isDarkMode ? tw.color('gray-400') : tw.color('gray-500'),
        tabBarStyle: {
          backgroundColor: isDarkMode ? tw.color('black') : tw.color('white'),
          borderTopColor: isDarkMode ? tw.color('gray-800') : tw.color('gray-200'),
        },
      }}
    >
      <Tab.Screen name="Expenses" component={ExpenseStackNavigator} options={{ tabBarIcon: renderExpensesIcon }} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} options={{ tabBarIcon: renderAnalyticsIcon }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

