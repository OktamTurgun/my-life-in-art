import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useColors } from '../hooks/useColors';

type Props = {
  onMenuPress: () => void;
  showHamburger?: boolean;
  onThemeToggle: () => void;
  isDark: boolean;
};

function LiveDate() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const pad = (n: number) => String(n).padStart(2, '0');
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const date = `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`;
  return (
    <Text style={{
      fontFamily: Platform.OS === 'web' ? 'monospace' : 'System',
      fontSize: 14,
      letterSpacing: 0,
      color: '#717182'
    }}>
      {time} | {date}
    </Text>
  );
}

export default function Navbar({ onMenuPress, showHamburger = true, onThemeToggle, isDark }: Props) {
  const C = useColors();
  const { width } = useWindowDimensions();
  const isSmall = width < 500;

  return (
    <View style={[styles.navbar, {
      backgroundColor: C.navbarBg,
      borderBottomColor: C.border,
    }]}>

      {/* Chap — Logo */}
      <View style={styles.logoArea}>
        <View style={[styles.logoBadge, { backgroundColor: '#f29900' }]}>
          <Text style={[styles.logoBadgeText, { color: '#fff' }]}>MU</Text>
        </View>
        {!isSmall && (
          <View style={styles.logoTextBox}>
            <Text style={[styles.logoName, { color: C.text }]}>Mirzo Ulug'bek</Text>
            <Text style={[styles.logoLabel, { color: '#f29900' }]}>+ muallif</Text>
          </View>
        )}
      </View>

      {/* O'rta — Sarlavha */}
      <Text style={[styles.title, { color: C.textMuted }]}>
        San'atdagi hayot yo'lim
      </Text>

      {/* O'ng */}
      <View style={styles.right}>
        {!isSmall && <LiveDate />}

        {/* Dark mode toggle */}
        <TouchableOpacity
          onPress={onThemeToggle}
          style={[styles.iconBtn, { backgroundColor: C.bgMuted }]}
        >
          <Ionicons
            name={isDark ? 'sunny-outline' : 'moon-outline'}
            size={18}
            color={isDark ? '#f29900' : C.textMuted}
          />
        </TouchableOpacity>

        {/* Hamburger */}
        {showHamburger && (
          <TouchableOpacity
            onPress={onMenuPress}
            style={[styles.iconBtn, { backgroundColor: C.bgMuted }]}
          >
            <Ionicons name="menu-outline" size={22} color={C.text} />
          </TouchableOpacity>
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: { elevation: 1 },
      web: { boxShadow: '0 1px 8px rgba(0,0,0,0.04)' },
    }),
  },
  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  logoBadge: {
    width: 40,
    height: 40,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  logoBadgeText: {
    fontWeight: '900',
    fontSize: 16,
  },
  logoTextBox: { gap: 1 },
  logoName: {
    fontWeight: '800',
    fontSize: 16,
  },
  logoLabel: {
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: '600',
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
    flex: 2,
    textAlign: 'center',
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});