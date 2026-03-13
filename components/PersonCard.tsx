import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/colors';

type Props = {
  id: string;
  name: string;
  profession: string;
  image: string;
  isSelected: boolean;
};

export default function PersonCard({ id, name, profession, image, isSelected }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={() => router.push(`/person/${id}`)}
      activeOpacity={0.75}
    >
      <Image source={{ uri: image }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={[styles.name, isSelected && styles.nameSelected]}>
          {name}
        </Text>
        <Text style={styles.profession}>{profession}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardSelected: {
    borderLeftColor: Colors.gold,
    backgroundColor: Colors.creamDark,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.gold,
    backgroundColor: Colors.brownLight,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.brownDark,
  },
  nameSelected: {
    color: Colors.brownMid,
  },
  profession: {
    fontSize: 12,
    color: Colors.gold,
    fontWeight: '600',
    marginTop: 2,
  },
  arrow: {
    fontSize: 22,
    color: Colors.brownLight,
    marginLeft: 8,
  },
});