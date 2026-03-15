import { useRouter } from 'expo-router';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useColors } from '../hooks/useColors';

type Props = {
  id: string;
  name: string;
  profession: string;
  image: string;
  isSelected: boolean;
};

export default function PersonCard({ id, name, profession, image, isSelected }: Props) {
  const router = useRouter();
  const C = useColors();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: isSelected ? C.bgMuted : C.bgCard,
          borderColor: C.border,
          borderLeftColor: isSelected ? '#f29900' : 'transparent',
        }
      ]}
      onPress={() => router.push(`/person/${id}`)}
      activeOpacity={0.75}
    >
      {/* Avatar */}
      <Image
        source={{ uri: image }}
        style={[
          styles.avatar,
          { borderColor: isSelected ? '#f29900' : C.border }
        ]}
      />

      {/* Info */}
      <View style={styles.info}>
        <Text style={[styles.name, { color: C.text }]}>
          {name}
        </Text>
        <Text style={[styles.profession, { color: C.textMuted }]}>
          {profession}
        </Text>
      </View>

      {/* Arrow */}
      <Text style={[styles.arrow, { color: isSelected ? '#f29900' : C.textMuted }]}>
        ›
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderLeftWidth: 3,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: { elevation: 1 },
      web: { boxShadow: '0 1px 8px rgba(0,0,0,0.05)' },
    }),
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    backgroundColor: '#ececf0',
    flexShrink: 0,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
  },
  profession: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 2,
  },
  arrow: {
    fontSize: 22,
    marginLeft: 8,
  },
});