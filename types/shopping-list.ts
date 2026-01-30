export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
}

export interface ShoppingList {
  id: string;
  name: string;
  items: ShoppingItem[];
  createdAt: string;
  updatedAt: string;
}
