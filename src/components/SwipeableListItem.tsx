import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import tw from 'twrnc';
import { Trash2 } from 'lucide-react-native';

const ACTION_BUTTON_WIDTH = 80;

interface SwipeableListItemProps {
  children: React.ReactNode;
  onDelete: () => void;
}

const SwipeableListItem = ({ children, onDelete }: SwipeableListItemProps) => {
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = Math.max(-ACTION_BUTTON_WIDTH, Math.min(0, event.translationX));
    })
    .onEnd(() => {
      if (translateX.value < -ACTION_BUTTON_WIDTH / 2) {
        translateX.value = withTiming(-ACTION_BUTTON_WIDTH);
      } else {
        translateX.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleDeletePress = () => {
    runOnJS(onDelete)();
  };

  return (
    <View style={tw`mb-3`}>
      <View style={[styles.actionContainer, tw`bg-red-600 rounded-2xl`]}>
        <TouchableOpacity onPress={handleDeletePress} style={styles.actionButton}>
          <Trash2 size={24} color="white" />
        </TouchableOpacity>
      </View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedStyle}>
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: ACTION_BUTTON_WIDTH,
  },
  actionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SwipeableListItem;

