import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Platform, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Colors from '../constants/colors';
import { usePeople } from '../hooks/usePeople';

const BREAKPOINT = 768;

export default function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { people } = usePeople();
  const { width } = useWindowDimensions();
  const pathname = usePathname();
  const isWeb = Platform.OS === 'web';
  const isWide = isWeb && width >= BREAKPOINT;

  const selectedId = pathname.startsWith('/person/')
    ? pathname.replace('/person/', '')
    : null;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <StatusBar style="light" backgroundColor={Colors.navbarBg} />

        {/* Navbar */}
        <Navbar
          onMenuPress={() => setSidebarOpen(true)}
          showHamburger={!isWide}
        />

        {/* Body */}
        <View style={styles.body}>
          {isWide && (
            <View style={styles.desktopSidebar}>
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
                contentStyle: { backgroundColor: Colors.cream },
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
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.navbarBg,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.cream,
  },
  desktopSidebar: {
    width: 272,
    borderRightWidth: 1,
    borderRightColor: Colors.sidebarBorder,
  },
  content: {
    flex: 1,
  },
});