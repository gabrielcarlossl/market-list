import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AddItemInputProps {
  onAddItem: (itemName: string, quantity: number) => void;
}

export function AddItemInput({ onAddItem }: AddItemInputProps) {
  const [text, setText] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (text.trim()) {
      onAddItem(text.trim(), quantity);
      setText('');
      setQuantity(1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(q => q - 1);
  };

  const handleIncrease = () => {
    setQuantity(q => q + 1);
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
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={handleDecrease}
              disabled={quantity <= 1}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={[styles.qtyButtonText, quantity <= 1 && styles.qtyButtonDisabled]}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{quantity}</Text>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={handleIncrease}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.qtyButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={[styles.addButton, !text.trim() && styles.addButtonDisabled]}
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
  qtyButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    lineHeight: 22,
  },
  qtyButtonDisabled: {
    color: '#ccc',
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    minWidth: 20,
    textAlign: 'center',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    lineHeight: 30,
  },
});
