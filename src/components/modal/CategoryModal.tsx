import React, { useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

interface CategoryModalProps {
  visible: boolean;
  categories: string[];
  onClose: () => void;
  onSelect: (category: string) => void;
  isDarkMode: boolean;
}

const Separator = React.memo(({ isDarkMode }: { isDarkMode: boolean }) => (
  <View
    style={[
      styles.separator,
      isDarkMode ? styles.separatorDark : styles.separatorLight,
    ]}
  />
));

const CategoryModal = ({
  visible,
  categories,
  onClose,
  onSelect,
  isDarkMode,
}: CategoryModalProps) => {

  const renderSeparator = useCallback(() => <Separator isDarkMode={isDarkMode} />, [isDarkMode]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <SafeAreaView style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              isDarkMode ? styles.modalContentDark : styles.modalContentLight,
            ]}
            onStartShouldSetResponder={() => true}
          >
            <Text
              style={tw`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}
            >
              Select a Category
            </Text>

            <FlatList
              data={categories}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.categoryItem}
                  onPress={() => onSelect(item)}
                >
                  <Text
                    style={tw`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={renderSeparator}
            />
          </View>
        </SafeAreaView>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContainer: { maxHeight: '50%' },
  modalContent: { padding: 22, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  modalContentLight: { backgroundColor: 'white' },
  modalContentDark: { backgroundColor: '#111827' },
  categoryItem: { paddingVertical: 16 },
  separator: { height: 1 },
  separatorLight: { backgroundColor: '#E5E7EB' },
  separatorDark: { backgroundColor: '#374151' },
});

export default CategoryModal;
