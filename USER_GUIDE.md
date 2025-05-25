# 🎵 Timbrosa Music App - User Guide

Welcome to **Timbrosa**, your elegant web-based music player with YouTube integration! This guide will help you get started and make the most of all features.

## 🚀 Quick Start

### Option 1: Try Demo Mode (No Setup Required)
1. Open `index.html` in your web browser
2. Click "Try Demo Mode" when prompted
3. Explore the interface with sample content

### Option 2: Full Setup with Real Music (Recommended)
1. **Get a YouTube API Key** (free, takes 2 minutes)
2. **Configure the app** with your API key
3. **Enjoy unlimited real music** from YouTube

---

## 🔧 Setup for Real Music

### Step 1: Get Your Free YouTube API Key

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** (or select existing one)
3. **Enable YouTube Data API v3**:
   - Go to "APIs & Services" → "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. **Create API Key**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy your new API key

### Step 2: Configure Timbrosa

**Method A: Copy Example Config (Recommended)**
```bash
# In your terminal, navigate to the Timbrosa folder and run:
cp src/config.local.example.js src/config.local.js
```

**Method B: Create Config Manually**
Create a file called `src/config.local.js` with:
```javascript
// Local configuration for Timbrosa Music App
window.YOUTUBE_API_KEY = 'YOUR_API_KEY_HERE';
```

### Step 3: Add Your API Key
1. Open `src/config.local.js` in any text editor
2. Replace `YOUR_API_KEY_HERE` with your actual API key
3. Save the file

### Step 4: Launch Timbrosa
1. Open `index.html` in your web browser
2. You should see real music content loading!

---

## 🎶 How to Use Timbrosa

### Main Interface

**Sidebar Navigation:**
- 🏠 **Home**: Main dashboard with featured and trending music
- 🔍 **Search**: Search for any song, artist, or album
- 📚 **Library**: Your saved music (coming soon)
- ➕ **Create Playlist**: Make custom playlists (coming soon)
- ❤️ **Liked Songs**: Your favorites (coming soon)

**Main Content Area:**
- **Featured Music**: Curated popular content
- **Trending Music**: What's hot right now
- **Search Results**: When you search for music

**Bottom Player:**
- **Now Playing**: Shows current track info and artwork
- **Playback Controls**: Play, pause, previous, next, shuffle, repeat
- **Progress Bar**: Shows playback progress, click to seek
- **Volume Controls**: Adjust volume or mute

### Playing Music

**Multiple Ways to Play:**
1. **Click any track** in the main grid
2. **Click the play button** on track artwork
3. **Click featured items** to play popular content
4. **Search and select** from results

**Playback Controls:**
- ⏯️ **Play/Pause**: Space bar or click button
- ⏮️ **Previous Track**: Go back in playlist
- ⏭️ **Next Track**: Skip to next song
- 🔀 **Shuffle**: Random playback order
- 🔁 **Repeat**: Loop current track or playlist

### Searching for Music

1. **Click the search area** in the sidebar (or it appears automatically)
2. **Type your search**: Song name, artist, album, or genre
3. **Wait for results**: Auto-searches as you type
4. **Click any result** to play immediately

**Search Tips:**
- Try "artist name + song title" for best results
- Search by genre: "jazz", "rock", "electronic"
- Use quotes for exact phrases: "bohemian rhapsody"
- Clear search to return to trending music

### Volume and Audio

**Volume Control:**
- **Click volume bar** to set specific level
- **Click volume icon** to mute/unmute
- **Scroll wheel** over volume area (if supported)

**Audio Quality:**
- Automatically uses best available YouTube quality
- Quality depends on original video upload
- No ads (uses YouTube player API)

---

## 🎯 Features Overview

### ✅ Current Features
- **Real YouTube Music**: Millions of songs and videos
- **Smart Search**: Find any music content
- **Trending Discovery**: See what's popular
- **Featured Content**: Curated music selections
- **Full Playback Controls**: Play, pause, seek, volume
- **Track Navigation**: Previous/next in playlists
- **Beautiful UI**: Dark theme with orange accents
- **Responsive Design**: Works on desktop and mobile
- **No Ads**: Clean music experience

### 🔄 Coming Soon
- **Playlists**: Create and manage custom playlists
- **Favorites**: Save your liked songs
- **History**: See recently played tracks
- **Lyrics**: Display song lyrics
- **Equalizer**: Audio customization
- **Offline Mode**: Download for offline listening

---

## 🛠️ Troubleshooting

### "No API Key" Banner Appears
**Problem**: You see an orange banner asking for API setup
**Solution**: Follow the setup guide above to get a YouTube API key

### Search Not Working
**Problem**: Search shows modal instead of results
**Solution**: Make sure your API key is properly configured in `src/config.local.js`

### Music Won't Play
**Possible Causes & Solutions:**
1. **No API Key**: Set up YouTube API key
2. **Browser Blocking**: Allow autoplay in browser settings
3. **Internet Connection**: Check your connection
4. **Video Unavailable**: Try a different song

### API Quota Exceeded
**Problem**: "Quota exceeded" error message
**Solution**: 
- Wait until tomorrow (quota resets daily)
- Or upgrade to paid Google Cloud plan for higher limits
- Free tier: 10,000 API calls per day (plenty for normal use)

### Slow Loading
**Possible Solutions:**
- Check internet connection speed
- Clear browser cache and reload
- Try different search terms
- Restart browser

---

## 🔒 Privacy & Security

### Your Data
- **No personal data collected**: Timbrosa runs entirely in your browser
- **No account required**: Just open and use
- **No tracking**: We don't monitor your listening habits

### API Key Security
- **Keep it private**: Never share your API key
- **Local storage only**: Key stays on your computer
- **Not in repository**: Automatically excluded from Git
- **Restrict usage**: Set API key restrictions in Google Cloud Console

---

## 💡 Tips & Tricks

### Better Search Results
- **Be specific**: "The Beatles Hey Jude" vs just "Hey Jude"
- **Try variations**: "acoustic version", "live performance", "remix"
- **Use artist names**: Include the artist for better accuracy

### Keyboard Shortcuts
- **Spacebar**: Play/pause current track
- **Escape**: Close any open modal
- **Enter**: In search, perform search immediately

### Performance Tips
- **Close other tabs**: For better audio performance
- **Use Chrome/Firefox**: Best compatibility
- **Stable internet**: For uninterrupted streaming

### Discovering Music
- **Check trending**: See what's popular globally
- **Browse featured**: Curated content from popular channels
- **Search genres**: "chill hop", "synthwave", "lo-fi"
- **Explore artists**: Search for similar artists

---

## 🆘 Need Help?

### Quick Solutions
1. **Refresh the page**: Solves most temporary issues
2. **Check console**: Press F12 → Console for error messages
3. **Try demo mode**: Test if the app works without API
4. **Clear browser cache**: Sometimes fixes loading issues

### Getting Support
- **Check the setup guide**: `SETUP_GUIDE.md` for detailed instructions
- **Test your API key**: Use `test-api-key.html` to verify setup
- **Browser compatibility**: Use modern browsers (Chrome, Firefox, Safari, Edge)

### Common Error Messages
- **"API key not configured"**: Follow setup guide
- **"Search failed"**: Check internet connection and API key
- **"Failed to load content"**: Try refreshing or check API quota

---

## 🎉 Enjoy Your Music!

You're all set! Timbrosa gives you access to millions of songs from YouTube in a beautiful, ad-free interface. 

**Happy listening!** 🎵

---

*Made with ❤️ for music lovers everywhere* 