import { StyleSheet, Text, View } from 'react-native';

export function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🛒</Text>
      <Text style={styles.text}>Sua lista está vazia</Text>
      <Text style={styles.subtext}>Adicione itens usando o campo abaixo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
