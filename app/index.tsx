import { useLocalSearchParams } from 'expo-router';
import {
  FlatList, SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import PersonCard from '../components/PersonCard';
import Colors from '../constants/colors';
import { usePeople } from '../hooks/usePeople';

export default function HomeScreen() {
  const { people, loading } = usePeople();
  const params = useLocalSearchParams();
  const selectedId = params.id as string | undefined;

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Yuklanmoqda...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Ishtirokchilar</Text>
        <Text style={styles.pageCount}>{people.length} ta san'atkor</Text>
      </View>
      <FlatList
        data={people}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PersonCard
            id={item.id}
            name={item.name}
            profession={item.profession}
            image={item.image}
            isSelected={item.id === selectedId}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: Colors.brownMid,
    fontSize: 16,
  },
  pageHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.sidebarBorder,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.brownDark,
  },
  pageCount: {
    fontSize: 13,
    color: Colors.gold,
    fontWeight: '600',
  },
  list: {
    padding: 16,
  },
});