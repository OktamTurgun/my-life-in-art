import {
  Image,
  Linking, Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useColors } from '../hooks/useColors';


type Props = {
  videoId: string;
  title?: string;
};

export default function VideoPlayer({ videoId, title }: Props) {
  const C = useColors();
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, {
        backgroundColor: C.bgCard,
        borderColor: C.border,
      }]}>

        {/* Header */}
        <View style={[styles.header, { borderBottomColor: C.border }]}>
          <View style={styles.headerLeft}>
            <View style={[styles.playIcon, { backgroundColor: '#f29900' }]}>
              <Text style={styles.playText}>▶</Text>
            </View>
            <Text style={[styles.headerText, { color: C.text }]} numberOfLines={1}>
              {title || 'Video suhbat'}
            </Text>
          </View>
          <TouchableOpacity onPress={() => Linking.openURL(youtubeUrl)}>
            <Text style={[styles.openLink, { color: '#f29900' }]}>YouTube ↗</Text>
          </TouchableOpacity>
        </View>

        {/* Video */}
        <View style={styles.videoBox}>
          {Platform.OS === 'web' ? (
            <WebEmbed videoId={videoId} />
          ) : (
            <MobileEmbed videoId={videoId} youtubeUrl={youtubeUrl} />
          )}
        </View>

      </View>
    </View>
  );
}

function WebEmbed({ videoId }: { videoId: string }) {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
      style={{ width: '100%', height: '100%', border: 'none' }}
      allowFullScreen
    />
  );
}

function MobileEmbed({ videoId, youtubeUrl }: { videoId: string; youtubeUrl: string }) {
  return (
    <TouchableOpacity
      style={styles.fallback}
      onPress={() => Linking.openURL(youtubeUrl)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` }}
        style={styles.thumb}
        resizeMode="cover"
      />
      <View style={styles.playOverlay}>
        <View style={styles.playCircle}>
          <Text style={styles.playArrow}>▶</Text>
        </View>
        <Text style={styles.tapHint}>Videoni ko&apos;rish uchun bosing ↗</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 32,
  },
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
      },
      android: { elevation: 4 },
      web: { boxShadow: '0 4px 24px rgba(0,0,0,0.08)' },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  playIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  playText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '900',
  },
  headerText: {
    fontWeight: '600',
    fontSize: 14,
    flex: 1,
  },
  openLink: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 8,
  },
  videoBox: {
    height: Platform.OS === 'web' ? 420 : 220,
    backgroundColor: '#000',
  },
  fallback: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#000',
  },
  fallbackBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  fallbackIcon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '900',
  },
  fallbackText: {
    fontSize: 16,
    fontWeight: '700',
  },
  fallbackSub: {
    fontSize: 13,
  },
  thumb: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  playCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  playArrow: {
    fontSize: 24,
    color: '#f29900',
    marginLeft: 4,
  },
  tapHint: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
});
