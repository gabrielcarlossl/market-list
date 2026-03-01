import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

import { AddItemInput } from '@/components/shopping/add-item-input';
import { EditItemModal } from '@/components/shopping/edit-item-modal';
import { EmptyState } from '@/components/shopping/empty-state';
import { Header } from '@/components/shopping/header';
import { ListItem } from '@/components/shopping/list-item';
import { RenameListModal } from '@/components/shopping/rename-list-modal';
import { storageService } from '@/services/storage';
import { ShoppingItem, ShoppingList } from '@/types/shopping-list';

export default function EditListScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [listId, setListId] = useState<string>('');
  const [listName, setListName] = useState<string>('Nova Lista');
  const flatListRef = useRef<FlatList>(null);
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    const listIdParam = params.listId as string;
    const listNameParam = params.listName as string;

    if (listIdParam) {
      // Editing existing list
      const lists = await storageService.getSavedLists();
      const existingList = lists.find(l => l.id === listIdParam);
      if (existingList) {
        setItems(existingList.items);
        setListId(existingList.id);
        setListName(existingList.name);
        setIsSaved(true);
      }
    } else {
      // Creating new list
      const newId = Date.now().toString();
      setListId(newId);
      setListName(listNameParam || 'Nova Lista');
    }
  };

  const handleAddItem = (itemName: string, quantity: number = 1) => {
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: itemName,
      quantity,
    };
    setItems([...items, newItem]);
    setIsSaved(false);
    
    // Scroll to the end after adding item
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleIncrease = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
    setIsSaved(false);
  };

  const handleDecrease = (id: string) => {
    setItems(prevItems => {
      const item = prevItems.find(i => i.id === id);
      if (!item) return prevItems;

      if (item.quantity === 1) {
        return prevItems.filter(i => i.id !== id);
      }

      return prevItems.map(i =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
    setIsSaved(false);
  };

  const handleToggleCheck = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
    setIsSaved(false);
  };

  const handleLongPress = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      setEditingItem(item);
    }
  };

  const handleEditConfirm = (newName: string) => {
    if (editingItem) {
      setItems(items.map(item =>
        item.id === editingItem.id ? { ...item, name: newName } : item
      ));
      setIsSaved(false);
    }
    setEditingItem(null);
  };

  const handleSaveList = async () => {
    if (items.length === 0) {
      Alert.alert('Lista vazia', 'Adicione itens antes de salvar a lista.');
      return;
    }

    const list: ShoppingList = {
      id: listId,
      name: listName,
      items: [...items],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    try {
      await storageService.saveList(list);
      setIsSaved(true);
      Alert.alert('Salvo!', 'Lista salva com sucesso.');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a lista.');
    }
  };

  const handleBack = () => {
    if (!isSaved && items.length > 0) {
      Alert.alert(
        'Descartar alterações?',
        'Você tem itens não salvos. Deseja descartar?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Descartar', style: 'destructive', onPress: () => router.back() },
        ]
      );
    } else {
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <Header 
        title={listName}
        onMenuPress={handleBack}
        onSavePress={handleSaveList}
        onTitlePress={() => setShowRenameModal(true)}
      />
      
      <FlatList
        ref={flatListRef}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onLongPress={handleLongPress}
            onToggleCheck={handleToggleCheck}
          />
        )}
        ListEmptyComponent={<EmptyState />}
        contentContainerStyle={items.length === 0 ? styles.emptyList : undefined}
      />

      <AddItemInput onAddItem={handleAddItem} />

      <EditItemModal
        visible={!!editingItem}
        itemName={editingItem?.name || ''}
        onClose={() => setEditingItem(null)}
        onConfirm={handleEditConfirm}
      />

      <RenameListModal
        visible={showRenameModal}
        currentName={listName}
        onClose={() => setShowRenameModal(false)}
        onConfirm={(newName) => {
          setListName(newName);
          setIsSaved(false);
          setShowRenameModal(false);
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyList: {
    flex: 1,
  },
});
