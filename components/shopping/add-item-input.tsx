import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AddItemInputProps {
  onAddItem: (itemName: string) => void;
}

export function AddItemInput({ onAddItem }: AddItemInputProps) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      onAddItem(text.trim());
      setText('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="adicionar item"
            placeholderTextColor="#999"
            onSubmitEditing={handleAdd}
            returnKeyType="done"
          />
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAdd}
            disabled={!text.trim()}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    lineHeight: 30,
  },
});
