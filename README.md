# Timbrosa - Elegant Music App with YouTube Integration

A sophisticated web-based music player application with YouTube Music API integration, featuring a modern UI and real music content.

## ✨ Features

### 🎵 Music Playback
- **Real YouTube Music Integration** - Stream actual music videos and songs
- **Search Functionality** - Search for any song, artist, or album
- **Trending Music** - Discover what's popular right now
- **Featured Content** - Curated music from popular channels
- **Playlist Support** - Access and play YouTube playlists

### 🎨 User Interface
- **Modern Design** - Clean, Spotify-inspired interface with dark theme
- **Responsive Layout** - Works perfectly on desktop and mobile devices
- **Interactive Controls** - Play/pause, volume, progress bar, and track navigation
- **Real-time Updates** - Live progress tracking and time displays
- **High-Quality Artwork** - Beautiful album covers and thumbnails

### 🔧 Technical Features
- **YouTube IFrame Player API** - Seamless video playback integration
- **Intelligent Caching** - Optimized API usage with 5-minute cache
- **Error Handling** - Graceful fallbacks and user-friendly error messages
- **Search Debouncing** - Efficient search with 500ms delay
- **Responsive Grid Layout** - Adaptive content display

## 🚀 Quick Start

### Option 1: Try Demo Mode (Instant)
1. Open `index.html` in your browser
2. Click "Try Demo Mode" when prompted
3. Explore with sample content

### Option 2: Full Setup (2 minutes)
1. Get a free YouTube API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Copy `src/config.local.example.js` to `src/config.local.js`
3. Add your API key to the config file
4. Open `index.html` and enjoy real music!

📖 **Detailed Guide**: See [USER_GUIDE.md](USER_GUIDE.md) for complete instructions

## 📁 Project Structure

```
timbrosa/
├── index.html                 # Main HTML file
├── src/
│   ├── config.js             # Configuration and API settings
│   ├── app.js                # Main application logic
│   ├── youtube-api-service.js # YouTube API integration
│   ├── youtube-integration.js # YouTube player controls
│   └── styles/
│       └── main.css          # Application styling
├── README.md                 # This file
├── YOUTUBE_API_SETUP.md      # Detailed setup guide
└── Timbrosa.txt             # Project description
```

## 🎯 Usage

### Basic Controls
- **Play/Pause**: Click the play button or use the main control
- **Volume**: Adjust using the volume slider or click to mute
- **Progress**: Click anywhere on the progress bar to seek
- **Navigation**: Use previous/next buttons to navigate tracks

### Search
- Click on the Search section in the sidebar
- Type any song, artist, or album name
- Results appear in real-time as you type
- Click any track to start playing

### Featured Content
- Browse trending music in the main content area
- Click on featured items to discover new music
- Tracks are automatically loaded from popular music channels

## ⚙️ Configuration

### API Settings
Edit `src/config.js` to customize:

```javascript
// Your YouTube Data API key
YOUTUBE_API_KEY: 'your-api-key-here',

// Search parameters
DEFAULT_SEARCH_PARAMS: {
    maxResults: 25,        // Number of search results
    order: 'relevance',    // Sort order
    videoCategoryId: '10'  // Music category
},

// Featured music channels
FEATURED_CHANNELS: [
    'UC-9-kyTW8ZkZNDHQJ6FgpwQ', // Add your preferred channels
    // ... more channel IDs
]
```

### Customization Options
- **Theme Colors**: Modify CSS variables in `src/styles/main.css`
- **Featured Channels**: Add your favorite music channel IDs
- **Search Parameters**: Adjust result count and sorting
- **Region Settings**: Change country code for trending music

## 🔧 API Integration Details

### YouTube Data API v3
- **Search**: Find music videos and songs
- **Trending**: Get popular music content
- **Video Details**: Fetch duration, view counts, and metadata
- **Playlists**: Access and play YouTube playlists

### Quota Management
- **Free Tier**: 10,000 units per day
- **Caching**: 5-minute cache reduces API calls
- **Efficient Requests**: Optimized to minimize quota usage

### Error Handling
- Graceful fallback to demo content if API is unavailable
- User-friendly error messages
- Automatic retry mechanisms

## 🛠️ Development

### Adding New Features
1. **New API Endpoints**: Extend `youtube-api-service.js`
2. **UI Components**: Add to `app.js` and style in `main.css`
3. **Configuration**: Update `config.js` for new settings

### Testing
- Open browser Developer Tools (F12)
- Check Console for error messages and API responses
- Monitor Network tab for API requests

## 📱 Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## 🔒 Security

### API Key Protection
- Never commit API keys to public repositories
- Use environment variables in production
- Restrict API keys to specific domains
- Monitor usage in Google Cloud Console

### Best Practices
- Regular key rotation
- Domain restrictions
- Usage monitoring
- Error logging

## 🚨 Troubleshooting

### Common Issues

**No music loads, shows demo content**
- Check if API key is configured in `src/config.js`
- Verify YouTube Data API v3 is enabled
- Check browser console for error messages

**Search not working**
- Ensure API key has proper permissions
- Check quota limits in Google Cloud Console
- Verify internet connection

**Playback issues**
- Check if YouTube IFrame API is loaded
- Verify video availability in your region
- Check browser's autoplay policies

For detailed troubleshooting, see [YOUTUBE_API_SETUP.md](YOUTUBE_API_SETUP.md)

## 📄 License

This project is available for personal and commercial use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter issues:
1. Contact me: gsmcq@uw.edu
2. Check the [Setup Guide](YOUTUBE_API_SETUP.md)
3. Review browser console for errors
4. Verify API configuration
5. Check quota usage in Google Cloud Console

---

**🎵 Built with ❤️ for music lovers everywhere! 🎵** 
