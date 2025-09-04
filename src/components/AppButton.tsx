import React from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
} from 'react-native';
import tw from 'twrnc';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

const AppButton = ({
  title,
  variant = 'primary',
  style,
  ...props
}: ButtonProps) => {
  const buttonStyle =
    variant === 'primary'
      ? tw`bg-blue-600 shadow-md`
      : tw`bg-gray-200 shadow-sm`;
  const textStyle =
    variant === 'primary' ? tw`text-white` : tw`text-gray-800`;

  return (
    <TouchableOpacity
      style={[tw`py-3 px-6 rounded-lg items-center justify-center`, buttonStyle, style]}
      activeOpacity={0.8}
      {...props}>
      <Text style={[tw`text-base font-bold`, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;
