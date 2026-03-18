import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import PersonDetail from '../../components/PersonDetail';
import { useColors } from '../../hooks/useColors';
import { usePerson } from '../../hooks/usePeople';

export default function PersonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { person, loading } = usePerson(id);
  const C = useColors();

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: C.bg }]}>
        <Text style={[styles.text, { color: C.textMuted }]}>Yuklanmoqda...</Text>
      </View>
    );
  }

  if (!person) {
    return (
      <View style={[styles.center, { backgroundColor: C.bg }]}>
        <Text style={[styles.text, { color: C.textMuted }]}>Shaxs topilmadi</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: C.bg }]}>
      <PersonDetail {...person} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%', // WEBDA TO'LIQ KENGUYISH UCHUN
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
});