import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface RenameListModalProps {
  visible: boolean;
  currentName: string;
  onClose: () => void;
  onConfirm: (name: string) => void;
}

export function RenameListModal({ visible, currentName, onClose, onConfirm }: RenameListModalProps) {
  const [listName, setListName] = useState(currentName);

  useEffect(() => {
    if (visible) {
      setListName(currentName);
    }
  }, [visible, currentName]);

  const handleConfirm = () => {
    if (listName.trim()) {
      onConfirm(listName.trim());
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        >
          <View style={styles.modal} onStartShouldSetResponder={() => true}>
            <Text style={styles.title}>Renomear Lista</Text>
            <Text style={styles.subtitle}>Digite o novo nome da lista:</Text>

            <TextInput
              style={styles.input}
              value={listName}
              onChangeText={setListName}
              placeholder="Nome da lista"
              placeholderTextColor="#999"
              autoFocus
              selectTextOnFocus
              onSubmitEditing={handleConfirm}
            />

            <View style={styles.buttons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleConfirm}
                disabled={!listName.trim()}
              >
                <Text style={[
                  styles.confirmText,
                  !listName.trim() && styles.disabledText,
                ]}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 24,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  confirmButton: {
    backgroundColor: '#000',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  confirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  disabledText: {
    opacity: 0.4,
  },
});
