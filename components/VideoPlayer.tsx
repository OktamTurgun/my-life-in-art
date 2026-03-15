import {
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
  try {
    const { WebView } = require('react-native-webview');
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; background: #000; }
            body { width: 100vw; height: 100vh; overflow: hidden; }
            iframe {
              position: absolute;
              top: 0; left: 0;
              width: 100%; height: 100%;
              border: none;
            }
          </style>
        </head>
        <body>
          <iframe
            src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0&playsinline=1&modestbranding=1&enablejsapi=1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </body>
      </html>
    `;
    return (
      <WebView
        source={{ html }}
        style={{ flex: 1, backgroundColor: '#000' }}
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={['*']}
        mixedContentMode="always"
      />
    );
  } catch {
    return (
      <TouchableOpacity
        style={styles.fallback}
        onPress={() => Linking.openURL(youtubeUrl)}
      >
        <View style={[styles.fallbackBtn, { backgroundColor: '#f29900' }]}>
          <Text style={styles.fallbackIcon}>▶</Text>
        </View>
        <Text style={[styles.fallbackText, { color: '#252525' }]}>
          Videoni ko'rish
        </Text>
        <Text style={[styles.fallbackSub, { color: '#717182' }]}>
          YouTube da ochish ↗
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 28,
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
    height: 420,
    backgroundColor: '#000',
  },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#f5f5f5',
    padding: 24,
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
});