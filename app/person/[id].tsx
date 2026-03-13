import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import PersonDetail from '../../components/PersonDetail';
import Colors from '../../constants/colors';
import { usePerson } from '../../hooks/usePeople';

export default function PersonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { person, loading } = usePerson(id);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Yuklanmoqda...</Text>
      </View>
    );
  }

  if (!person) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Shaxs topilmadi</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PersonDetail
        name={person.name}
        profession={person.profession}
        image={person.image}
        title={person.title}
        text={person.text}
        videoId={person.videoId}
      />
    </View>
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
    backgroundColor: Colors.cream,
  },
  text: {
    fontSize: 16,
    color: Colors.brownMid,
  },
});