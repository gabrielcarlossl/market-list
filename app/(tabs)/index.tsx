import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CreateListModal } from '@/components/shopping/create-list-modal';
import { storageService } from '@/services/storage';
import { ShoppingList } from '@/types/shopping-list';

export default function HomeScreen() {
  const router = useRouter();
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadLists();
    
    // Reload lists when screen comes into focus
    const interval = setInterval(() => {
      loadLists();
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const loadLists = async () => {
    const savedLists = await storageService.getSavedLists();
    setLists(savedLists.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    ));
  };

  const handleCreateNewList = () => {
    setShowCreateModal(true);
  };

  const handleConfirmCreate = (listName: string) => {
    setShowCreateModal(false);
    router.push({
      pathname: '/edit-list',
      params: { listName },
    });
  };

  const handleOpenList = (list: ShoppingList) => {
    router.push({
      pathname: '/edit-list',
      params: { 
        listId: list.id,
        listName: list.name,
      },
    });
  };

  const handleDeleteList = (listId: string, listName: string) => {
    Alert.alert(
      'Excluir Lista',
      `Deseja excluir a lista "${listName}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await storageService.deleteList(listId);
            loadLists();
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTotalItems = (list: ShoppingList) => {
    return list.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const renderListItem = ({ item }: { item: ShoppingList }) => (
    <TouchableOpacity 
      style={styles.listCard}
      onPress={() => handleOpenList(item)}
      activeOpacity={0.7}
    >
      <View style={styles.listHeader}>
        <Text style={styles.listName}>{item.name}</Text>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            handleDeleteList(item.id, item.name);
          }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.deleteButton}>🗑️</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.listDate}>{formatDate(item.updatedAt)}</Text>
      
      <View style={styles.listStats}>
        <Text style={styles.statText}>
          {item.items.length} {item.items.length === 1 ? 'item' : 'itens'}
        </Text>
        <Text style={styles.statText}>•</Text>
        <Text style={styles.statText}>
          Total: {getTotalItems(item)} {getTotalItems(item) === 1 ? 'unidade' : 'unidades'}
        </Text>
      </View>

      {item.items.length > 0 && (
        <View style={styles.itemsPreview}>
          {item.items.slice(0, 3).map((listItem, index) => (
            <Text key={index} style={styles.previewItem}>
              • {listItem.name} ({listItem.quantity})
            </Text>
          ))}
          {item.items.length > 3 && (
            <Text style={styles.moreItems}>
              e mais {item.items.length - 3} {item.items.length - 3 === 1 ? 'item' : 'itens'}...
            </Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Minhas Listas</Text>
        </View>
      </SafeAreaView>

      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        renderItem={renderListItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>📋</Text>
            <Text style={styles.emptyText}>Nenhuma lista criada</Text>
            <Text style={styles.emptySubtext}>
              Crie sua primeira lista de compras
            </Text>
          </View>
        }
      />

      <SafeAreaView edges={['bottom']} style={styles.footerContainer}>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleCreateNewList}
          activeOpacity={0.8}
        >
          <Text style={styles.createButtonText}>+ Criar Lista</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <CreateListModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onConfirm={handleConfirmCreate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  listContent: {
    padding: 16,
  },
  listCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  listName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  deleteButton: {
    fontSize: 20,
  },
  listDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  listStats: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  statText: {
    fontSize: 14,
    color: '#999',
  },
  itemsPreview: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  previewItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  moreItems: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  footerContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  createButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
