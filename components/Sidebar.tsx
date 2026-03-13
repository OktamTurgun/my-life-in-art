import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Colors from '../constants/colors';

type Person = {
  id: string;
  name: string;
  profession: string;
  image: string;
};

type Props = {
  people: Person[];
  selectedId: string | null;
  isOpen: boolean;
  onClose: () => void;
  isDesktop?: boolean;
};

const SIDEBAR_WIDTH = 272;

export default function Sidebar({
  people, selectedId, isOpen, onClose, isDesktop = false
}: Props) {
  const router = useRouter();
  const translateX = useRef(
    new Animated.Value(isDesktop ? 0 : -SIDEBAR_WIDTH)
  ).current;

  useEffect(() => {
    if (isDesktop) return;
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : -SIDEBAR_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen, isDesktop]);

  const handleSelect = (id: string) => {
    router.push(`/person/${id}`);
    if (!isDesktop) onClose();
  };

  const content = (
    <View style={[styles.sidebar, isDesktop && styles.sidebarDesktop]}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerAccent} />
        <Text style={styles.headerText}>ISHTIROKCHILAR</Text>
      </View>

      {/* Ro'yxat */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {people.map((person, index) => {
          const isActive = selectedId === person.id;
          return (
            <TouchableOpacity
              key={person.id}
              style={[styles.item, isActive && styles.itemActive]}
              onPress={() => handleSelect(person.id)}
              activeOpacity={0.7}
            >

              {/* Avatar */}
              <View style={[styles.avatarWrapper, isActive && styles.avatarWrapperActive]}>
                <Image source={{ uri: person.image }} style={styles.avatar} />
              </View>

              {/* Info */}
              <View style={styles.info}>
                <Text style={[styles.name, isActive && styles.nameActive]} numberOfLines={1}>
                  {person.name}
                </Text>
                <Text style={[styles.profession, isActive && styles.professionActive]}>
                  {person.profession}
                </Text>
              </View>

              {/* Active indicator */}
              {isActive && <View style={styles.activeBar} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  if (isDesktop) return content;

  return (
    <>
      {isOpen && (
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <Animated.View style={[
        styles.mobileWrapper,
        { transform: [{ translateX }] }
      ]}>
        {content}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(26,8,0,0.6)',
    zIndex: 900,
  },
  mobileWrapper: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0,
    width: SIDEBAR_WIDTH,
    zIndex: 1000,
    elevation: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  sidebar: {
    flex: 1,
    backgroundColor: Colors.sidebarBg,
  },
  sidebarDesktop: {
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: Colors.sidebarBorder,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.sidebarBorder,
    backgroundColor: Colors.creamDark,
    gap: 8,
  },
  headerAccent: {
    width: 3,
    height: 16,
    backgroundColor: Colors.gold,
    borderRadius: 2,
  },
  headerText: {
    flex: 1,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2.5,
    color: Colors.brownLight,
  },
  headerCount: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.gold,
    backgroundColor: 'rgba(200,146,42,0.12)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  listContent: {
    paddingVertical: 6,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(217,196,160,0.35)',
    position: 'relative',
  },
  itemActive: {
    backgroundColor: Colors.sidebarActive,
  },
  avatarWrapper: {
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Colors.sidebarBorder,
    padding: 1,
  },
  avatarWrapperActive: {
    borderColor: Colors.gold,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.brownLight,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textDark,
    letterSpacing: 0.2,
  },
  nameActive: {
    color: Colors.goldPale,
  },
  profession: {
    fontSize: 11,
    color: Colors.gold,
    fontWeight: '600',
    marginTop: 1,
  },
  professionActive: {
    color: Colors.goldLight,
    opacity: 0.85,
  },
  activeBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: Colors.gold,
    borderRadius: 2,
  },
});