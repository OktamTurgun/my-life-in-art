import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useColors } from '../hooks/useColors';
import { Language, useLanguage } from '../hooks/useLanguage';

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

const SIDEBAR_WIDTH = 280;

export default function Sidebar({
  people, selectedId, isOpen, onClose, isDesktop = false
}: Props) {
  const router = useRouter();
  const C = useColors();
  const { t, lang, setLang } = useLanguage();

const getProfession = (profession: string) => {
  const profs = t.professions as Record<string, string>;
  return profs[profession] || profession;
};
  const translateX = useRef(
    new Animated.Value(isDesktop ? 0 : -SIDEBAR_WIDTH)
  ).current;

  useEffect(() => {
    if (isDesktop) return;
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : -SIDEBAR_WIDTH,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }, [isOpen, isDesktop]);

  const handleSelect = (id: string) => {
    router.replace(`/person/${id}`);
    if (!isDesktop) onClose();
  };

  const content = (
    <View style={[
      styles.sidebar,
      isDesktop && styles.sidebarDesktop,
      { backgroundColor: C.sidebarBg, borderRightColor: C.sidebarBorder }
    ]}>

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: C.sidebarBorder }]}>
        <Text style={[styles.headerText, { color: C.textMuted }]}>
          {t.sidebar.participants.toUpperCase()}
        </Text>

        {/* Til tanlash — faqat mobilda */}
        {!isDesktop && (
          <View style={[styles.langGroup, { backgroundColor: C.bgMuted }]}>
            {(['uz', 'en', 'ru'] as Language[]).map((l) => (
              <TouchableOpacity
                key={l}
                onPress={() => setLang(l)}
                style={[
                  styles.langBtn,
                  lang === l && { backgroundColor: '#f29900' }
                ]}
              >
                <Text style={[
                  styles.langText,
                  { color: lang === l ? '#fff' : C.textMuted }
                ]}>
                  {l.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Ro'yxat */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {people.map((person) => {
          const isActive = selectedId === person.id;
          return (
            <TouchableOpacity
              key={person.id}
              style={[
                styles.item,
                { borderBottomColor: C.sidebarBorder },
                isActive && { backgroundColor: C.sidebarActive, borderLeftColor: C.primary },
              ]}
              onPress={() => handleSelect(person.id)}
              activeOpacity={0.7}
            >
              {/* Avatar */}
              <Image
                source={{ uri: person.image }}
                style={[styles.avatar, { borderColor: isActive ? C.primary : C.border }]}
              />

              {/* Info */}
              <View style={styles.info}>
                <Text
                  style={[styles.name, { color: isActive ? C.text : C.text }]}
                  numberOfLines={1}
                >
                  {person.name}
                </Text>
                <Text style={[styles.profession, { color: C.textMuted }]}>
                  {getProfession(person.profession)}
                </Text>
              </View>

              {isActive && (
                <Text style={[styles.arrow, { color: C.primary }]}>›</Text>
              )}
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 900,
  },
  mobileWrapper: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0,
    width: SIDEBAR_WIDTH,
    zIndex: 1000,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: { elevation: 12 },
    }),
  },
  sidebar: {
    flex: 1,
  },
  sidebarDesktop: {
    height: '100%',
    borderRightWidth: 1,
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
  },
  listContent: {
    paddingVertical: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
    backgroundColor: '#ececf0',
    flexShrink: 0,
  },
  info: { flex: 1 },
  name: {
    fontSize: 15,
    fontWeight: '700',
  },
  profession: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 3,
  },
  arrow: {
    fontSize: 18,
    fontWeight: '700',
  },
  langGroup: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    padding: 2,
    gap: 2,
    marginTop: 10,
  },
  langBtn: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  langText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});