import { ShoppingList } from '@/types/shopping-list';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LISTS_KEY = '@shopping_lists';
const CURRENT_LIST_KEY = '@current_shopping_list';

export const storageService = {
  // Get all saved lists
  async getSavedLists(): Promise<ShoppingList[]> {
    try {
      const data = await AsyncStorage.getItem(LISTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting saved lists:', error);
      return [];
    }
  },

  // Save a new list
  async saveList(list: ShoppingList): Promise<void> {
    try {
      const lists = await this.getSavedLists();
      const existingIndex = lists.findIndex(l => l.id === list.id);
      
      if (existingIndex >= 0) {
        lists[existingIndex] = list;
      } else {
        lists.push(list);
      }
      
      await AsyncStorage.setItem(LISTS_KEY, JSON.stringify(lists));
    } catch (error) {
      console.error('Error saving list:', error);
      throw error;
    }
  },

  // Delete a saved list
  async deleteList(listId: string): Promise<void> {
    try {
      const lists = await this.getSavedLists();
      const filtered = lists.filter(l => l.id !== listId);
      await AsyncStorage.setItem(LISTS_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting list:', error);
      throw error;
    }
  },

  // Get current list (the one being edited)
  async getCurrentList(): Promise<ShoppingList | null> {
    try {
      const data = await AsyncStorage.getItem(CURRENT_LIST_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting current list:', error);
      return null;
    }
  },

  // Save current list
  async saveCurrentList(list: ShoppingList): Promise<void> {
    try {
      await AsyncStorage.setItem(CURRENT_LIST_KEY, JSON.stringify(list));
    } catch (error) {
      console.error('Error saving current list:', error);
      throw error;
    }
  },

  // Clear current list
  async clearCurrentList(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CURRENT_LIST_KEY);
    } catch (error) {
      console.error('Error clearing current list:', error);
      throw error;
    }
  },
};
