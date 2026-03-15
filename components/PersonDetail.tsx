import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useColors } from '../hooks/useColors';
import VideoPlayer from './VideoPlayer';

type Props = {
  name: string;
  profession: string;
  image: string;
  title: string;
  text: string;
  videoId: string;
};

export default function PersonDetail({
  name, profession, image, title, text, videoId
}: Props) {
  const C = useColors();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: C.bg }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.inner}>

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: image }} style={styles.avatar} />
            <View style={[styles.professionBadge, { backgroundColor: C.primary }]}>
              <Text style={[styles.professionBadgeText, { color: C.primaryFg }]}>
                {profession.toUpperCase()}
              </Text>
            </View>
          </View>
          <View style={styles.heroInfo}>
            <Text style={[styles.name, { color: C.text }]}>{name}</Text>
            <View style={[styles.nameLine, { backgroundColor: C.primary }]} />
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={[styles.dividerLine, { backgroundColor: C.border }]} />
          <Text style={[styles.dividerIcon, { color: C.textMuted }]}>✦</Text>
          <View style={[styles.dividerLine, { backgroundColor: C.border }]} />
        </View>

        {/* Quote blok */}
        <View style={[styles.quoteCard, { backgroundColor: C.bgCard, borderColor: C.border }]}>
          <Text style={[styles.quoteMark, { color: C.bgMuted }]}>"</Text>
          <View style={styles.quoteLabel}>
            <View style={[styles.quoteLabelLine, { backgroundColor: C.textMuted }]} />
            <Text style={[styles.quoteLabelText, { color: C.textMuted }]}>
              {title.toUpperCase()}
            </Text>
          </View>
          <Text style={[styles.quoteText, { color: C.text }]}>{text}</Text>
        </View>

        {/* Mening hikoyam */}
        <View style={[styles.storyCard, { backgroundColor: C.bgCard, borderColor: C.border }]}>
          <View style={styles.storyHeader}>
            <View style={[styles.storyAccent, { backgroundColor: C.primary }]} />
            <Text style={[styles.storyTitle, { color: C.text }]}>Mening hikoyam</Text>
          </View>
          <Text style={[styles.storyText, { color: C.textMuted }]}>
            {text}
          </Text>
        </View>

        {/* Video */}
        <VideoPlayer
          videoId={videoId}
          title={`Video suhbat — ${name} bilan`}
        />

        {/* Pastki hint */}
        <Text style={[styles.hint, { color: C.textMuted }]}>
          ← Chap tomondagi ro'yxatdan boshqa ishtirokchilarni tanlang
        </Text>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  inner: {
    width: '100%',
    alignSelf: 'center',
    paddingTop: 8,
    paddingHorizontal: Platform.OS === 'web' ? 48 : 0,
  },

  // Hero
  hero: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 28,
    paddingBottom: 20,
    gap: 20,
  },
  avatarWrapper: {
    position: 'relative',
    flexShrink: 0,
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 16,
    backgroundColor: '#ececf0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: { elevation: 4 },
      web: { boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
    }),
  },
  professionBadge: {
    position: 'absolute',
    bottom: -8,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: 4,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  professionBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  heroInfo: {
    flex: 1,
    paddingBottom: 12,
  },
  name: {
    fontSize: Platform.OS === 'web' ? 48 : 28,
    fontWeight: '700',
    lineHeight: Platform.OS === 'web' ? 52 : 34,
    letterSpacing: 0.2,
  },
  nameLine: {
    width: 40,
    height: 3,
    borderRadius: 2,
    marginTop: 10,
  },

  // Divider
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 28,
    marginBottom: 24,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerIcon: {
    fontSize: 10,
    opacity: 0.4,
  },

  // Quote
  quoteCard: {
    marginHorizontal: 28,
    marginBottom: 16,
    borderRadius: 16,
    padding: 24,
    paddingTop: 12,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: { elevation: 1 },
      web: { boxShadow: '0 1px 12px rgba(0,0,0,0.04)' },
    }),
  },
  quoteMark: {
    fontSize: 48,
    lineHeight: 48,
    fontWeight: '700',
    opacity: 0.3,
  },
  quoteLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  quoteLabelLine: {
    width: 14,
    height: 1,
  },
  quoteLabelText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
  },
  quoteText: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
    letterSpacing: 0.2,
  },

  // Story
  storyCard: {
    marginHorizontal: 28,
    marginBottom: 24,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: { elevation: 1 },
      web: { boxShadow: '0 1px 12px rgba(0,0,0,0.04)' },
    }),
  },
  storyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  storyAccent: {
    width: 4,
    height: 22,
    borderRadius: 2,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  storyText: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.2,
  },

  // Hint
  hint: {
    textAlign: 'center',
    fontSize: 12,
    marginHorizontal: 28,
    marginBottom: 16,
    letterSpacing: 0.3,
  },
});