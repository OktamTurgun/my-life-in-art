import { Ionicons } from '@expo/vector-icons'; // Ko'zcha belgisi uchun
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { saveAuth, validateLogin } from '../hooks/useAuth';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleLogin = async () => {
    if (pin.length !== 4) {
      setError("PIN 4 ta raqamdan iborat bo'lishi kerak");
      return;
    }
    if (!password) {
      setError("Parolni kiriting");
      return;
    }
    setLoading(true);
    setError('');
    
    // Simulyatsiya uchun
    await new Promise(r => setTimeout(r, 800));
    
    if (validateLogin(pin, password)) {
      await saveAuth();
      router.replace('/');
    } else {
      setError("PIN yoki parol noto'g'ri");
    }
    setLoading(false);
  };

  const renderPinInputs = () => {
    const inputs = [];
    for (let i = 0; i < 4; i++) {
      const isFocused = pin.length === i;
      inputs.push(
        <View 
          key={i} 
          style={[
            styles.pinBox, 
            isFocused && styles.pinBoxFocused,
            pin[i] ? styles.pinBoxFilled : null
          ]}
        >
          <Text style={styles.pinText}>{pin[i] || (isFocused ? '|' : '')}</Text>
        </View>
      );
    }
    return inputs;
  };

  return (
    <KeyboardAvoidingView 
      style={styles.root} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Logo Qismi */}
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>MU</Text>
          </View>
          <Text style={styles.title}>San'atdagi hayot yo'lim</Text>
          <Text style={styles.subtitle}>Kirish uchun PIN va parolni kiriting</Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          
          {/* PIN KOD Label & Icons */}
          <View style={styles.labelRow}>
            <Ionicons name="lock-closed-outline" size={14} color="#F27405" />
            <Text style={styles.label}> PIN KOD</Text>
          </View>

          {/* PIN Inputs */}
          <View style={styles.pinContainer}>
            {renderPinInputs()}
            <TextInput
              style={styles.hiddenInput}
              value={pin}
              onChangeText={(t) => setPin(t.replace(/[^0-9]/g, '').slice(0, 4))}
              keyboardType="numeric"
              maxLength={4}
              autoFocus={true}
            />
          </View>

          {/* Stepper Dots */}
          <View style={styles.stepper}>
            {[0, 1, 2, 3].map((dot) => (
              <View 
                key={dot} 
                style={[styles.dot, pin.length > dot ? styles.dotActive : styles.dotInactive]} 
              />
            ))}
          </View>

          {/* PAROL Section */}
          <View style={[styles.labelRow, { marginTop: 20 }]}>
            <Ionicons name="person-outline" size={14} color="#F27405" />
            <Text style={styles.label}> PAROL</Text>
          </View>
          
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Parolni kiriting"
              placeholderTextColor="#A0A0A0"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(t) => {setPassword(t); setError('');}}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#A0A0A0" />
            </TouchableOpacity>
          </View>

          {/* Error Message (Rasm 2 dagi kabi) */}
          {error ? (
            <View style={styles.errorContainer}>
              <View style={styles.errorContent}>
                <Ionicons name="warning" size={18} color="#E6B014" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            </View>
          ) : null}

          {/* Login Button */}
          <TouchableOpacity 
            style={styles.loginBtn} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.loginBtnText}>Kirish</Text>
            )}
          </TouchableOpacity>

          {/* Footer Links */}
          <View style={styles.footerLinks}>
            <TouchableOpacity><Text style={styles.linkText}>PIN ni unutdingizmi?</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.linkText}>Parolni tiklash</Text></TouchableOpacity>
          </View>
        </View>

        <Text style={styles.copyright}>© 2026 Mirzo Ulug'bek</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FEF9F3' },
  scroll: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  
  header: { alignItems: 'center', marginBottom: 40 },
  logoBox: {
    width: 60, height: 60, backgroundColor: '#F27405', 
    borderRadius: 18, justifyContent: 'center', alignItems: 'center',
    shadowColor: "#F27405", shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3, shadowRadius: 10, elevation: 5, marginBottom: 20
  },
  logoText: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: '800', color: '#101B2B', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#7D848D' },

  card: {
    width: '100%', maxWidth: 400, backgroundColor: '#FFF',
    borderRadius: 30, padding: 25,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 15, elevation: 3
  },
  labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  label: { fontSize: 12, fontWeight: '700', color: '#4A5660', letterSpacing: 0.5 },

  pinContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  pinBox: {
    width: Platform.OS === 'web' ? 64 : width * 0.15,
    height: 60,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E5E9EF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pinBoxFocused: { borderColor: '#F27405', borderWidth: 2 },
  pinBoxFilled: { backgroundColor: '#F8F9FB' },
  pinText: { fontSize: 22, fontWeight: 'bold', color: '#101B2B' },
  hiddenInput: { position: 'absolute', opacity: 0, width: '100%', height: '100%' },

  stepper: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 25 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  dotActive: { backgroundColor: '#F27405' },
  dotInactive: { backgroundColor: '#E5E9EF' },

  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E9EF',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
  },
  passwordInput: {
    flex: 1,
    color: '#101B2B',
    fontSize: 15,
    ...Platform.select({
      web: { outlineStyle: 'none' } as any,
    }),
  },

  errorContainer: {
    marginTop: 20, backgroundColor: '#FFF5F5', borderRadius: 12,
    borderLeftWidth: 4, borderLeftColor: '#D93025', padding: 12
  },
  errorContent: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  errorText: { color: '#D93025', fontSize: 13, fontWeight: '600' },

  loginBtn: {
    backgroundColor: '#F27405', height: 55, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center', marginTop: 25,
    shadowColor: "#F27405", shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4
  },
  loginBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },

  footerLinks: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  linkText: { color: '#7D848D', fontSize: 13, fontWeight: '500' },
  
  copyright: { marginTop: 40, color: '#A0A0A0', fontSize: 12 }
});