import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

import { AddItemInput } from '@/components/shopping/add-item-input';
import { EmptyState } from '@/components/shopping/empty-state';
import { Header } from '@/components/shopping/header';
import { ListItem } from '@/components/shopping/list-item';
import { storageService } from '@/services/storage';
import { ShoppingItem, ShoppingList } from '@/types/shopping-list';

export default function EditListScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [listId, setListId] = useState<string>('');
  const [listName, setListName] = useState<string>('Nova Lista');
  const flatListRef = useRef<FlatList>(null);

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
      }
    } else {
      // Creating new list
      const newId = Date.now().toString();
      setListId(newId);
      setListName(listNameParam || 'Nova Lista');
    }
  };

  const handleAddItem = (itemName: string) => {
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: itemName,
      quantity: 1,
    };
    setItems([...items, newItem]);
    
    // Scroll to the end after adding item
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleIncrease = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
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
      Alert.alert('Sucesso', 'Lista salva com sucesso!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a lista.');
    }
  };

  const handleBack = () => {
    if (items.length > 0) {
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
          />
        )}
        ListEmptyComponent={<EmptyState />}
        contentContainerStyle={items.length === 0 ? styles.emptyList : undefined}
      />

      <AddItemInput onAddItem={handleAddItem} />
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
