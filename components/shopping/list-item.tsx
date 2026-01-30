import { ShoppingItem } from '@/types/shopping-list';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ListItemProps {
  item: ShoppingItem;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
}

export function ListItem({ item, onIncrease, onDecrease }: ListItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => onIncrease(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <Text style={styles.quantity}>{item.quantity}</Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => onDecrease(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  nameContainer: {
    flex: 1,
    paddingRight: 16,
  },
  itemName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    lineHeight: 22,
  },
  quantity: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    minWidth: 24,
    textAlign: 'center',
  },
});
