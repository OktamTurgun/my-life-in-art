import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { checkAuth } from '../hooks/useAuth';
import { usePeople } from '../hooks/usePeople';

export default function HomeScreen() {
  const { people, loading } = usePeople();
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const authed = await checkAuth();
      if (!authed) {
        router.replace('/login');
        return;
      }
      if (!loading && people.length > 0) {
        router.replace(`/person/${people[0].id}`);
      }
    };
    check();
  }, [loading, people]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#f29900" />
    </View>
  );
}