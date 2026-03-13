import { Platform, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Colors from '../constants/colors';

type Props = {
  onMenuPress: () => void;
  showHamburger?: boolean;
};

export default function Navbar({ onMenuPress, showHamburger = true }: Props) {
  const { width } = useWindowDimensions();
  const isSmall = width < 400;

  return (
    <View style={styles.navbar}>

      {/* Chap — Logo */}
      <View style={styles.logoArea}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoBadgeText}>MU</Text>
        </View>
        {!isSmall && (
          <View style={styles.logoTextBox}>
            <Text style={styles.logoName}>Mirzo Ulug'bek</Text>
            <Text style={styles.logoLabel}>✦ MUALLIF</Text>
          </View>
        )}
      </View>

      {/* O'rta — Sarlavha */}
      <View style={styles.titleBox}>
        <Text style={styles.titleItalic}>San'atdagi</Text>
        <Text style={styles.titleBold}>hayot yo'lim</Text>
      </View>

      {/* O'ng */}
      <View style={styles.right}>
        {!isSmall && <Text style={styles.year}>2024</Text>}
        {showHamburger && (
          <TouchableOpacity onPress={onMenuPress} style={styles.menuBtn}>
            <View style={styles.line} />
            <View style={[styles.line, styles.lineShort]} />
            <View style={styles.line} />
          </TouchableOpacity>
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    backgroundColor: Colors.navbarBg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    borderBottomWidth: 2,
    borderBottomColor: Colors.gold,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
      },
      android: { elevation: 8 },
      web: { boxShadow: '0 3px 16px rgba(26,8,0,0.5)' },
    }),
  },
  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 9,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.goldPale,
    flexShrink: 0,
  },
  logoBadgeText: {
    color: Colors.navbarBg,
    fontWeight: '900',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  logoTextBox: {
    gap: 1,
  },
  logoName: {
    color: Colors.goldPale,
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.2,
  },
  logoLabel: {
    color: Colors.gold,
    fontSize: 9,
    letterSpacing: 1.8,
    fontWeight: '600',
  },
  titleBox: {
    alignItems: 'center',
    flex: 2,
  },
  titleItalic: {
    color: Colors.goldPale,
    fontSize: 10,
    fontStyle: 'italic',
    letterSpacing: 0.8,
    opacity: 0.75,
  },
  titleBold: {
    color: Colors.goldPale,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
  },
  year: {
    color: Colors.gold,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    opacity: 0.75,
  },
  menuBtn: {
    gap: 5,
    padding: 7,
    borderRadius: 7,
    backgroundColor: 'rgba(200,146,42,0.12)',
  },
  line: {
    width: 20,
    height: 2,
    backgroundColor: Colors.goldPale,
    borderRadius: 2,
  },
  lineShort: {
    width: 13,
  },
});