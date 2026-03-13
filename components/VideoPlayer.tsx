import {
  Linking, Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Colors from '../constants/colors';

type Props = {
  videoId: string;
  title?: string;
};

export default function VideoPlayer({ videoId, title }: Props) {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.playIcon}>
              <Text style={styles.playText}>▶</Text>
            </View>
            <Text style={styles.headerText} numberOfLines={1}>
              {title || 'Video suhbat'}
            </Text>
          </View>
          <TouchableOpacity onPress={() => Linking.openURL(youtubeUrl)}>
            <Text style={styles.openLink}>YouTube ↗</Text>
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

// Web uchun iframe
function WebEmbed({ videoId }: { videoId: string }) {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
      style={{ width: '100%', height: '100%', border: 'none' }}
      allowFullScreen
    />
  );
}

// Mobil uchun — WebView HTML inject
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
    // WebView yuklanmasa — YouTube ga yo'naltirish
    return (
      <TouchableOpacity
        style={styles.fallback}
        onPress={() => Linking.openURL(youtubeUrl)}
      >
        <Text style={styles.fallbackIcon}>▶</Text>
        <Text style={styles.fallbackText}>YouTube da ko'rish</Text>
        <Text style={styles.fallbackSub}>Bosing ↗</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.navbarBg,
    borderWidth: 1,
    borderColor: 'rgba(200,146,42,0.2)',
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
      },
      android: { elevation: 6 },
      web: { boxShadow: '0 6px 32px rgba(26,8,0,0.18)' },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(200,146,42,0.15)',
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
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  playText: {
    color: Colors.navbarBg,
    fontSize: 10,
    fontWeight: '900',
  },
  headerText: {
    color: Colors.goldPale,
    fontWeight: '700',
    fontSize: 13,
    flex: 1,
  },
  openLink: {
    color: Colors.gold,
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.8,
    marginLeft: 8,
  },
  videoBox: {
    height: 220,
    backgroundColor: '#000',
  },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#0a0a0a',
  },
  fallbackIcon: {
    fontSize: 40,
    color: Colors.gold,
  },
  fallbackText: {
    color: Colors.goldPale,
    fontSize: 16,
    fontWeight: '700',
  },
  fallbackSub: {
    color: Colors.gold,
    fontSize: 13,
    opacity: 0.7,
  },
});