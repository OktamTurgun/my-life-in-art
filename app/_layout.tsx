import { Stack, usePathname, useRouter } from 'expo-router';
import Head from 'expo-router/head'; // QO'SHILDI
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { DarkColors, LightColors } from '../constants/colors';
import { AuthContext, checkAuth, clearAuth, saveAuth, validateLogin } from '../hooks/useAuth';
import { ThemeContext } from '../hooks/useColors';
import { getTranslations, Language, LanguageContext } from '../hooks/useLanguage';
import { usePeople } from '../hooks/usePeople';

const BREAKPOINT = 768;

export default function RootLayout() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<Language>('uz');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { people } = usePeople();
  const { width } = useWindowDimensions();
  const pathname = usePathname();
  const router = useRouter();
  
  const isWeb = Platform.OS === 'web';
  const isWide = isWeb && width >= BREAKPOINT;
  const C = isDark ? DarkColors : LightColors;
  const t = getTranslations(lang);

  const selectedId = pathname.startsWith('/person/')
    ? pathname.replace('/person/', '')
    : null;

  const isLoginPage = pathname === '/login';

  useEffect(() => {
    let mounted = true;
    setTimeout(async () => {
      try {
        const authed = await checkAuth();
        if (!mounted) return;
        setIsAuthenticated(authed);
        setIsLoading(false);
        if (!authed && !isLoginPage) {
          router.replace('/login');
        }
      } catch {
        if (!mounted) return;
        setIsLoading(false);
        router.replace('/login');
      }
    }, 200);
    return () => { mounted = false; };
  }, []);

  const login = async (pin: string, password: string) => {
    const valid = validateLogin(pin, password);
    if (valid) {
      await saveAuth();
      setIsAuthenticated(true);
    }
    return valid;
  };

  const logout = async () => {
    await clearAuth();
    setIsAuthenticated(false);
    router.replace('/login');
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: C.bg }}>
        <ActivityIndicator size="large" color="#f29900" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      <ThemeContext.Provider value={{ isDark, toggleTheme: () => setIsDark(p => !p) }}>
        <LanguageContext.Provider value={{ lang, setLang, t }}>
          {/* WEB UCHUN VIEWPORT SOZLAMASI */}
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
          </Head>
          
          <SafeAreaProvider>
            <SafeAreaView
              style={[styles.root, { backgroundColor: isLoginPage ? C.bg : C.navbarBg }]}
              edges={['top', 'bottom']}
            >
              <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor={C.navbarBg} />

              {isLoginPage ? (
                <Stack screenOptions={{ headerShown: false }} />
              ) : (
                <>
                  <Navbar
                    onMenuPress={() => setSidebarOpen(true)}
                    showHamburger={!isWide}
                    onThemeToggle={() => setIsDark(p => !p)}
                    isDark={isDark}
                  />
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
                  <Footer />
                  {!isWide && (
                    <Sidebar
                      people={people}
                      selectedId={selectedId}
                      isOpen={sidebarOpen}
                      onClose={() => setSidebarOpen(false)}
                      isDesktop={false}
                    />
                  )}
                </>
              )}
            </SafeAreaView>
          </SafeAreaProvider>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { flex: 1, flexDirection: 'row' },
  desktopSidebar: { width: 280, borderRightWidth: 1 },
  content: { flex: 1 },
});