import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '../constants/colors';
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
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.inner}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: image }} style={styles.avatar} />
            <View style={styles.avatarRing} />
          </View>
          <View style={styles.headerInfo}>
            <View style={styles.professionBadge}>
              <Text style={styles.professionText}>{profession.toUpperCase()}</Text>
            </View>
            <Text style={styles.name}>{name}</Text>
          </View>
        </View>

        {/* Ajratgich */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerIcon}>✦</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Bo'lim sarlavhasi */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionAccent} />
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>

        {/* Matn */}
        <View style={styles.textCard}>
          <Text style={styles.openQuote}>"</Text>
          <Text style={styles.text}>{text}</Text>
          <Text style={styles.closeQuote}>"</Text>
        </View>

        {/* Video */}
        <VideoPlayer
          videoId={videoId}
          title={`Video suhbat — ${name}`}
        />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  // Maksimal kenglik — professional web ko'rinish
  inner: {
    maxWidth: 960,
    width: '100%',
    alignSelf: 'flex-start',
    paddingTop: 8,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 28,
    gap: 20,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: Colors.brownLight,
  },
  avatarRing: {
    position: 'absolute',
    top: -4, left: -4,
    width: 92, height: 92,
    borderRadius: 46,
    borderWidth: 2,
    borderColor: Colors.gold,
    opacity: 0.7,
  },
  headerInfo: {
    flex: 1,
    gap: 8,
  },
  professionBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(200,146,42,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(200,146,42,0.25)',
  },
  professionText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2.5,
    color: Colors.gold,
  },
  name: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.brownDark,
    letterSpacing: 0.2,
    lineHeight: 36,
  },

  // Ajratgich
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
    backgroundColor: Colors.creamMid,
  },
  dividerIcon: {
    color: Colors.gold,
    fontSize: 11,
    opacity: 0.6,
  },

  // Bo'lim
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 28,
    marginBottom: 16,
    gap: 12,
  },
  sectionAccent: {
    width: 4,
    height: 22,
    backgroundColor: Colors.gold,
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.brownMid,
    letterSpacing: 0.2,
  },

  // Matn
  textCard: {
    marginHorizontal: 28,
    marginBottom: 28,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 28,
    paddingTop: 12,
    paddingBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: { elevation: 2 },
      web: { boxShadow: '0 2px 20px rgba(26,8,0,0.06)' },
    }),
  },
  openQuote: {
    fontSize: 52,
    color: Colors.gold,
    opacity: 0.2,
    lineHeight: 44,
    fontWeight: '900',
  },
  text: {
    fontSize: 16,
    lineHeight: 30,
    color: Colors.textMid,
    letterSpacing: 0.2,
    paddingHorizontal: 4,
  },
  closeQuote: {
    fontSize: 52,
    color: Colors.gold,
    opacity: 0.2,
    lineHeight: 36,
    fontWeight: '900',
    textAlign: 'right',
  },
});