import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
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
        <YoutubePlayer
          height={220}
          videoId={videoId}
          play={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 32 },
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    elevation: 4,
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
    width: 28, height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  playText: { color: '#fff', fontSize: 10, fontWeight: '900' },
  headerText: { fontWeight: '600', fontSize: 14, flex: 1 },
  openLink: { fontSize: 12, fontWeight: '600', marginLeft: 8 },
});