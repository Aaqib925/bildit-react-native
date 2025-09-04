import React from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import tw from 'twrnc';
import { useThemeStore } from '../store/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
  children?: React.ReactNode;
  tStyle?: object;
}

const AppButton = ({
  title,
  variant = 'primary',
  style,
  isLoading = false,
  children,
  tStyle,
  ...props
}: ButtonProps) => {
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = theme === 'dark';

  let buttonStyle;
  let textStyle;

  switch (variant) {
    case 'danger':
      buttonStyle = isDarkMode ? tw`bg-gray-800` : tw`bg-red-600`;
      textStyle = isDarkMode ? tw`text-red-500` : tw`text-white`;
      break;
    case 'secondary':
      buttonStyle = isDarkMode ? tw`bg-gray-700` : tw`bg-gray-200`;
      textStyle = isDarkMode ? tw`text-gray-200` : tw`text-gray-800`;
      break;
    case 'primary':
      buttonStyle = isDarkMode ? tw`bg-gray-800` : tw`bg-indigo-600`;
      textStyle = isDarkMode ? tw`text-indigo-500` : tw`text-white`;
      break;
    default:
      buttonStyle = tw`bg-indigo-600`;
      textStyle = tw`text-white`;
      break;
  }

  const loadingStyle = isLoading ? tw`opacity-70` : '';
  const activityIndicatorColor = (variant === 'primary' || (variant === 'danger' && !isDarkMode))
    ? 'white'
    : (isDarkMode ? tw.color('gray-200') : tw.color('gray-800'));


  return (
    <TouchableOpacity
      style={[tw`py-3 px-6 rounded-lg items-center justify-center flex-row`, buttonStyle, loadingStyle, style, tStyle]}
      activeOpacity={0.8}
      disabled={isLoading || props.disabled}
      {...props}>
      {isLoading ? (
        <ActivityIndicator color={activityIndicatorColor} />
      ) : (
        <>
          {children ? children : <Text style={[tw`text-base font-bold`, textStyle]}>{title}</Text>}
        </>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;

