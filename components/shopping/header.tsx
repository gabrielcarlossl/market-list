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
          <View style={styles.arrowIcon}>
            <View style={[styles.arrowLine, styles.arrowLineTop]} />
            <View style={[styles.arrowLine, styles.arrowLineBottom]} />
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
              <View style={styles.disketteShutter}>
                <View style={styles.disketteWindow} />
              </View>
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
  arrowIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowLine: {
    position: 'absolute',
    width: 14,
    height: 2.5,
    backgroundColor: '#000',
    borderRadius: 2,
  },
  arrowLineTop: {
    transform: [{ rotate: '-45deg' }, { translateY: -5 }],
  },
  arrowLineBottom: {
    transform: [{ rotate: '45deg' }, { translateY: 5 }],
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  disketteIcon: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 3,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  disketteShutter: {
    width: '100%',
    height: 9,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 3,
  },
  disketteWindow: {
    width: 6,
    height: 5,
    backgroundColor: '#888',
    borderRadius: 1,
  },
  disketteLabel: {
    position: 'absolute',
    bottom: 2,
    left: 3,
    right: 3,
    height: 7,
    backgroundColor: '#ddd',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#aaa',
  },
});
