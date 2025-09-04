import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { Sun, Moon, ArrowLeft } from 'lucide-react-native';
import { useThemeStore } from '../store/theme';

interface AppHeaderProps {
    title: string;
    canGoBack?: boolean;
    onBackPress?: () => void;
}

const AppHeader = ({ title, canGoBack = false, onBackPress }: AppHeaderProps) => {
    const { theme, toggleTheme } = useThemeStore();
    const isDarkMode = theme === 'dark';

    const IconComponent = isDarkMode ? Sun : Moon;
    const iconColor = isDarkMode ? '#F59E0B' : '#4F46E5';
    const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-900';
    const backIconColor = isDarkMode ? tw.color('gray-100') : tw.color('gray-900');

    return (
        <SafeAreaView style={tw`${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-md`}>
            <View style={tw`flex-row items-center justify-between py-2 px-4`}>
                {canGoBack ? (
                    <TouchableOpacity onPress={onBackPress} style={tw`p-2 -ml-2`}>
                        <ArrowLeft size={24} color={backIconColor} />
                    </TouchableOpacity>
                ) : (
                    <View style={tw`w-8`} />
                )}

                <Text style={tw`text-xl font-bold ${textColor}`}>
                    {title}
                </Text>

                <TouchableOpacity
                    onPress={toggleTheme}
                    style={tw`p-2 rounded-full`}
                    activeOpacity={0.7}
                >
                    <IconComponent size={22} color={iconColor} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default AppHeader;

