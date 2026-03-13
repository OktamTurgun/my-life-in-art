import { Platform, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/colors';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.inner}>
        <Text style={styles.title}>San'atdagi hayot yo'lim</Text>
        <View style={styles.dot} />
        <Text style={styles.copy}>© 2024 Mirzo Ulug'bek</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: Colors.navbarBg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(200,146,42,0.25)',
    paddingVertical: 14,
    paddingHorizontal: 24,
    ...Platform.select({
      web: { boxShadow: '0 -1px 12px rgba(26,8,0,0.2)' },
    }),
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    color: Colors.goldLight,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.gold,
    opacity: 0.5,
  },
  copy: {
    color: Colors.textMuted,
    fontSize: 12,
    letterSpacing: 0.3,
  },
});