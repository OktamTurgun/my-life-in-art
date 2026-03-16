import { Platform, StyleSheet, Text, View } from 'react-native';
import { useColors } from '../hooks/useColors';
import { useLanguage } from '../hooks/useLanguage';



export default function Footer() {
  const C = useColors();
  const { t } = useLanguage();

  return (
    <View style={[styles.footer, {
      backgroundColor: '#030213',
      borderTopColor: C.border,
    }]}>
      <View style={styles.inner}>

        {/* Chap — Logo */}
        <View style={styles.left}>
          <View style={[styles.logoBadge, { backgroundColor: '#f29900' }]}>
            <Text style={[styles.logoBadgeText, { color: '#ffffff' }]}>MU</Text>
          </View>
          <Text style={[styles.title, { color: '#ffffff' }]}>
            {t.footer.title}
          </Text>
        </View>

        {/* O'ng — Copyright */}
        <Text style={[styles.copy, { color: 'rgba(255,255,255,0.5)' }]}>
          {t.footer.copy}
        </Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    ...Platform.select({
      web: { boxShadow: '0 -1px 8px rgba(0,0,0,0.1)' },
    }),
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadgeText: {
    fontWeight: '900',
    fontSize: 13,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  copy: {
    fontSize: 12,
  },
});