import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useColors } from '../hooks/useColors';
import { Language, useLanguage } from '../hooks/useLanguage';

type Props = {
  onMenuPress: () => void;
  showHamburger?: boolean;
  onThemeToggle: () => void;
  isDark: boolean;
};

const LANG_LABELS: Record<string, string> = {
  uz: '🇺🇿 UZ',
  en: '🇬🇧 EN',
  ru: '🇷🇺 RU',
};

function LangDropdown({ lang, setLang, C }: {
  lang: Language;
  setLang: (l: Language) => void;
  C: any;
}) {
  const [open, setOpen] = useState(false);
  const langs: Language[] = ['uz', 'en', 'ru'];
  const labels: Record<Language, string> = {
    uz: 'UZ',
    en: 'EN',
    ru: 'RU',
  };

  return (
    <View>
      {/* Trigger */}
      <TouchableOpacity
        onPress={() => setOpen(p => !p)}
        style={[langStyles.trigger, {
          backgroundColor: C.bgCard,
          borderColor: C.border,
        }]}
        activeOpacity={0.8}
      >
        <Text style={[langStyles.triggerText, { color: C.text }]}>
          {labels[lang]}
        </Text>
        <Text style={[langStyles.arrow, { color: C.textMuted }]}>
          {open ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {/* Dropdown */}
      {open && (
        <>
          {/* Overlay — tashqariga bosganda yopiladi */}
          <TouchableOpacity
            style={langStyles.overlay}
            onPress={() => setOpen(false)}
            activeOpacity={1}
          />
          <View style={[langStyles.dropdown, {
            backgroundColor: C.bgCard,
            borderColor: C.border,
          }]}>
            {langs.map((l, i) => (
              <TouchableOpacity
                key={l}
                onPress={() => { setLang(l); setOpen(false); }}
                style={[
                  langStyles.option,
                  i < langs.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: C.border,
                  },
                  lang === l && { backgroundColor: '#f29900' + '18' },
                ]}
                activeOpacity={0.7}
              >
                <Text style={[
                  langStyles.optionText,
                  { color: lang === l ? '#f29900' : C.text },
                  lang === l && { fontWeight: '700' },
                ]}>
                  {labels[l]}
                </Text>
                {lang === l && (
                  <Text style={{ color: '#f29900', fontSize: 11 }}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const langStyles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
  },
  triggerText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  arrow: {
    fontSize: 7,
    fontWeight: '700',
  },
  overlay: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    zIndex: 998,
  },
  dropdown: {
    position: 'absolute',
    top: 42,
    right: 0,
    minWidth: 90,
    borderRadius: 10,
    borderWidth: 1,
    zIndex: 999,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: { elevation: 8 },
      web: { boxShadow: '0 8px 24px rgba(0,0,0,0.1)' },
    }),
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  optionText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

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
      color: '#717182',
    }}>
      {time} | {date}
    </Text>
  );
}

export default function Navbar({ onMenuPress, showHamburger = true, onThemeToggle, isDark }: Props) {
  const C = useColors();
  const { lang, setLang, t } = useLanguage();
  const { width } = useWindowDimensions();
  const isSmall = width < 500;

  const langs: Language[] = ['uz', 'en', 'ru'];

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
            <Text style={[styles.logoName, { color: C.text }]}>Mirzo Ulug&apos;bek</Text>
            <Text style={[styles.logoLabel, { color: '#f29900' }]}>+ {t.navbar.author}</Text>
          </View>
        )}
      </View>

      {/* O'rta — Sarlavha */}
      <Text style={[styles.title, { color: C.textMuted }]}>
        {t.navbar.title}
      </Text>

      {/* O'ng */}
      <View style={styles.right}>
        {!isSmall && <LiveDate />}

        {/* Til tanlash — faqat katta ekranda */}
        {!showHamburger && (
          <LangDropdown lang={lang} setLang={setLang} C={C} />
        )}

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
    zIndex: 1000,
    overflow: 'visible',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        zIndex: 1000,
      },
      android: { elevation: 10 },
      web: {
        boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
        overflow: 'visible',
        zIndex: 1000,
      },
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
    zIndex: 1000,
    overflow: 'visible',
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});