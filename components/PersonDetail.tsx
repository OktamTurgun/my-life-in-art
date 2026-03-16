import {
  Image, Platform, ScrollView,
  StyleSheet, Text, View,
} from 'react-native';
import { useColors } from '../hooks/useColors';
import { Language, useLanguage } from '../hooks/useLanguage';
import VideoPlayer from './VideoPlayer';

type Props = {
  name: string;
  profession: string;
  image: string;
  title_uz: string;
  title_en: string;
  title_ru: string;
  text_uz: string;
  text_en: string;
  text_ru: string;
  videoId: string;
};

function getText(person: Props, lang: Language, field: 'title' | 'text') {
  const key = `${field}_${lang}` as keyof Props;
  return (person[key] as string) || (person[`${field}_uz` as keyof Props] as string);
}

export default function PersonDetail(props: Props) {
  const C = useColors();
  const { lang, t } = useLanguage();

  const getProfession = (profession: string) => {
  const profs = t.professions as Record<string, string>;
  return profs[profession] || profession;
};

  const title = getText(props, lang, 'title');
  const text = getText(props, lang, 'text');

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
            <Image source={{ uri: props.image }} style={styles.avatar} />
            <View style={[styles.professionBadge, { backgroundColor: '#f29900' }]}>
              <Text style={[styles.professionBadgeText, { color: '#fff' }]}>
                {getProfession(props.profession).toUpperCase()}
              </Text>
            </View>
          </View>
          <View style={styles.heroInfo}>
            <Text style={[styles.name, { color: C.text }]}>{props.name}</Text>
            <View style={[styles.nameLine, { backgroundColor: '#f29900' }]} />
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
            <View style={[styles.storyAccent, { backgroundColor: '#f29900' }]} />
            <Text style={[styles.storyTitle, { color: C.text }]}>{t.detail.myStory}</Text>
          </View>
          <Text style={[styles.storyText, { color: C.textMuted }]}>{text}</Text>
        </View>

        {/* Video */}
        <VideoPlayer
          videoId={props.videoId}
          title={`${t.detail.videoTitle} — ${props.name}`}
        />

        {/* Hint */}
        <Text style={[styles.hint, { color: C.textMuted }]}>{t.detail.hint}</Text>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  inner: {
    width: '100%',
    alignSelf: 'center',
    paddingTop: 8,
    paddingHorizontal: Platform.OS === 'web' ? 48 : 16,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 28,
    gap: 20,
  },
  avatarWrapper: {
    position: 'relative',
    flexShrink: 0,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 16,
    backgroundColor: '#ececf0',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12 },
      android: { elevation: 4 },
      web: { boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
    }),
  },
  professionBadge: {
    position: 'absolute',
    bottom: -8, left: 0, right: 0,
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
    width: 40, height: 3,
    borderRadius: 2, marginTop: 10,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24, gap: 12,
  },
  dividerLine: { flex: 1, height: 1 },
  dividerIcon: { fontSize: 10, opacity: 0.4 },
  quoteCard: {
    marginBottom: 16,
    borderRadius: 16,
    padding: 24, paddingTop: 12,
    borderWidth: 1,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8 },
      android: { elevation: 1 },
      web: { boxShadow: '0 1px 12px rgba(0,0,0,0.04)' },
    }),
  },
  quoteMark: {
    fontSize: 48, lineHeight: 48, fontWeight: '700', opacity: 0.3,
  },
  quoteLabel: {
    flexDirection: 'row', alignItems: 'center',
    gap: 8, marginBottom: 12,
  },
  quoteLabelLine: { width: 14, height: 1 },
  quoteLabelText: {
    fontSize: 10, fontWeight: '700', letterSpacing: 2,
  },
  quoteText: {
    fontSize: 16, lineHeight: 24,
    fontStyle: 'italic', letterSpacing: 0.2,
  },
  storyCard: {
    marginBottom: 24,
    borderRadius: 16,
    padding: 24, borderWidth: 1,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8 },
      android: { elevation: 1 },
      web: { boxShadow: '0 1px 12px rgba(0,0,0,0.04)' },
    }),
  },
  storyHeader: {
    flexDirection: 'row', alignItems: 'center',
    gap: 10, marginBottom: 14,
  },
  storyAccent: { width: 4, height: 22, borderRadius: 2 },
  storyTitle: { fontSize: 18, fontWeight: '700' },
  storyText: { fontSize: 16, lineHeight: 24, letterSpacing: 0.2 },
  hint: {
    textAlign: 'center', fontSize: 12,
    marginBottom: 16, letterSpacing: 0.3,
  },
});