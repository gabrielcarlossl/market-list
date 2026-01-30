import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
  onMenuPress?: () => void;
  onSavePress?: () => void;
  showSaveButton?: boolean;
}

export function Header({ title, onMenuPress, onSavePress, showSaveButton = true }: HeaderProps) {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={onMenuPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <View style={styles.menuIcon}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </View>
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        {showSaveButton ? (
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={onSavePress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View style={styles.disketteIcon}>
              <View style={styles.disketteTop} />
              <View style={styles.disketteLabel} />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.iconButton} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  menuLine: {
    width: '100%',
    height: 3,
    backgroundColor: '#000',
    borderRadius: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  disketteIcon: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 2,
    backgroundColor: '#fff',
    position: 'relative',
  },
  disketteTop: {
    width: '100%',
    height: 8,
    backgroundColor: '#000',
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },
  disketteLabel: {
    position: 'absolute',
    bottom: 3,
    left: 3,
    right: 3,
    height: 3,
    backgroundColor: '#000',
    borderRadius: 1,
  },
});
