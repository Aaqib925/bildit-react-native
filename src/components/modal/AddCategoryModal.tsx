import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import tw from 'twrnc';
import { X } from 'lucide-react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';

interface AddCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onAddCategory: (categoryName: string) => void;
  isDarkMode: boolean;
}

const AddCategoryModal = ({
  visible,
  onClose,
  onAddCategory,
  isDarkMode,
}: AddCategoryModalProps) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    const trimmedName = newCategoryName.trim();
    if (trimmedName) {
      onAddCategory(trimmedName);
      setNewCategoryName('');
      setError('');
      onClose();
    } else {
      setError('Category name cannot be empty.');
    }
  };

  const handleClose = () => {
    setNewCategoryName('');
    setError('');
    onClose();
  };

  return (
    <Modal
      animationType="slide" 
      visible={visible}
      onRequestClose={handleClose}
    >
      <SafeAreaView
        style={[
          styles.container,
          isDarkMode ? styles.containerDark : styles.containerLight,
        ]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={tw`flex-1`}
        >
          <View style={tw`flex-row justify-between items-center p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <Text style={tw`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Add New Category
            </Text>
            <TouchableOpacity onPress={handleClose} style={tw`p-2`}>
              <X size={24} color={isDarkMode ? 'white' : 'black'} />
            </TouchableOpacity>
          </View>

          <View style={tw`flex-1 p-6`}>
            <TextInput
              style={[
                styles.textInput,
                isDarkMode ? styles.textInputDark : styles.textInputLight,
                error ? styles.textInputError : null,
              ]}
              placeholder="Enter category name"
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              value={newCategoryName}
              onChangeText={(text) => {
                setNewCategoryName(text);
                if (error) setError('');
              }}
              autoFocus={true}
            />
            {error ? (
              <Text style={tw`text-red-500 text-sm mt-1`}>{error}</Text>
            ) : null}
          </View>

          <View style={tw`p-6`}>
            <TouchableOpacity
              style={tw`w-full py-4 rounded-lg bg-indigo-600 items-center justify-center`}
              onPress={handleAdd}
            >
              <Text style={tw`text-base font-bold text-white`}>Add Category</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLight: {
    backgroundColor: '#F9FAFB', 
  },
  containerDark: {
    backgroundColor: 'black',
  },
  textInput: {
    fontSize: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 10,
  },
  textInputLight: {
    borderColor: '#D1D5DB',
    backgroundColor: 'white',
    color: 'black',
  },
  textInputDark: {
    borderColor: '#374151',
    backgroundColor: '#1F2937',
    color: 'white',
  },
  textInputError: {
    borderColor: '#EF4444', 
  },
});

export default AddCategoryModal;