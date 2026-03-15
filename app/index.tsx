import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { usePeople } from '../hooks/usePeople';

export default function HomeScreen() {
  const { people, loading } = usePeople();
  const router = useRouter();

  useEffect(() => {
    if (!loading && people.length > 0) {
      router.replace(`/person/${people[0].id}`);
    }
  }, [loading, people]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#f29900" />
    </View>
  );
}