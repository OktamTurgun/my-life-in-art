import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { createContext, useContext, useState } from 'react';
import { Platform, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { DarkColors, LightColors } from '../constants/colors';
import { getTranslations, Language, LanguageContext } from '../hooks/useLanguage';
import { usePeople } from '../hooks/usePeople';

const BREAKPOINT = 768;

// ===== Theme Context =====
export const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function RootLayout() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<Language>('uz');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { people } = usePeople();
  const { width } = useWindowDimensions();
  const pathname = usePathname();
  const isWeb = Platform.OS === 'web';
  const isWide = isWeb && width >= BREAKPOINT;
  const C = isDark ? DarkColors : LightColors;
  const t = getTranslations(lang);

  const selectedId = pathname.startsWith('/person/')
    ? pathname.replace('/person/', '')
    : null;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme: () => setIsDark(p => !p) }}>
      <LanguageContext.Provider value={{ lang, setLang, t }}>
        <SafeAreaProvider>
          <SafeAreaView
            style={[styles.root, { backgroundColor: C.navbarBg }]}
            edges={['top', 'bottom']}
          >
            <StatusBar
              style={isDark ? 'light' : 'dark'}
              backgroundColor={C.navbarBg}
            />

            {/* Navbar */}
            <Navbar
              onMenuPress={() => setSidebarOpen(true)}
              showHamburger={!isWide}
              onThemeToggle={() => setIsDark(p => !p)}
              isDark={isDark}
            />

            {/* Body */}
            <View style={[styles.body, { backgroundColor: C.bg }]}>
              {isWide && (
                <View style={[styles.desktopSidebar, { borderRightColor: C.sidebarBorder }]}>
                  <Sidebar
                    people={people}
                    selectedId={selectedId}
                    isOpen={true}
                    onClose={() => {}}
                    isDesktop={true}
                  />
                </View>
              )}
              <View style={styles.content}>
                <Stack
                  screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: C.bg },
                    animation: 'fade',
                  }}
                />
              </View>
            </View>

            {/* Footer */}
            <Footer />

            {/* Mobil sidebar */}
            {!isWide && (
              <Sidebar
                people={people}
                selectedId={selectedId}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                isDesktop={false}
              />
            )}
          </SafeAreaView>
        </SafeAreaProvider>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  desktopSidebar: {
    width: 280,
    borderRightWidth: 1,
  },
  content: { flex: 1 },
});