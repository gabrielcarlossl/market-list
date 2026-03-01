import { ShoppingItem } from '@/types/shopping-list';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ListItemProps {
  item: ShoppingItem;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onLongPress?: (id: string) => void;
  onToggleCheck?: (id: string) => void;
}

export function ListItem({ item, onIncrease, onDecrease, onLongPress, onToggleCheck }: ListItemProps) {
  return (
    <View style={[styles.container, item.checked && styles.containerChecked]}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onToggleCheck?.(item.id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <View style={[styles.checkboxBox, item.checked && styles.checkboxBoxChecked]}>
          {item.checked && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.nameContainer}
        onLongPress={() => onLongPress?.(item.id)}
        activeOpacity={0.7}
        delayLongPress={500}
      >
        <Text style={[styles.itemName, item.checked && styles.itemNameChecked]}>{item.name}</Text>
      </TouchableOpacity>

      <View style={styles.quantityContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => onDecrease(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantity}>{item.quantity}</Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => onIncrease(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.buttonText}>+</Text>
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
  containerChecked: {
    backgroundColor: '#f9f9f9',
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxBoxChecked: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  checkmark: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 15,
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
  itemNameChecked: {
    textDecorationLine: 'line-through',
    color: '#aaa',
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
