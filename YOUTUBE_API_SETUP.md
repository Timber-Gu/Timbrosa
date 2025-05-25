# YouTube Music API Setup Guide for Timbrosa

This guide will walk you through setting up the YouTube Data API v3 to enable real music content in your Timbrosa app.

## Step 1: Get a YouTube Data API Key

### 1.1 Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click "Create Project" or select an existing project
4. Give your project a name (e.g., "Timbrosa Music App")
5. Click "Create"

### 1.2 Enable the YouTube Data API v3

1. In the Google Cloud Console, go to **APIs & Services > Library**
2. Search for "YouTube Data API v3"
3. Click on "YouTube Data API v3"
4. Click the **"Enable"** button

### 1.3 Create API Credentials

1. Go to **APIs & Services > Credentials**
2. Click **"Create Credentials"** > **"API Key"**
3. Your API key will be generated and displayed
4. **Important**: Copy this key immediately and store it securely
5. (Optional) Click "Restrict Key" to add security restrictions:
   - **Application restrictions**: Choose "HTTP referrers" and add your domain
   - **API restrictions**: Select "YouTube Data API v3"

## Step 2: Configure Your Timbrosa App

### 2.1 Add Your API Key

1. Open `src/config.js` in your Timbrosa project
2. Replace `'YOUR_YOUTUBE_API_KEY_HERE'` with your actual API key:

```javascript
YOUTUBE_API_KEY: 'AIzaSyC4E1Pf0aAhiGsSxd2u0kp6NABJwAp_DVg', // Your actual API key
```

### 2.2 Test Your Setup

1. Open `index.html` in your web browser
2. Open the browser's Developer Tools (F12)
3. Check the Console tab for any errors
4. If configured correctly, you should see: "Timbrosa initialized with YouTube Music integration!"

## Step 3: Understanding the Features

### What You Get With YouTube Integration:

✅ **Real Music Content**: Trending music videos and songs  
✅ **Search Functionality**: Search for any song, artist, or album  
✅ **Featured Content**: Curated music from popular channels  
✅ **High-Quality Thumbnails**: Album artwork from YouTube  
✅ **Track Information**: Song titles, artists, duration, view counts  
✅ **Playlist Support**: Access to YouTube playlists  

### API Quota Information:

- **Free Tier**: 10,000 units per day
- **Search Request**: 100 units each
- **Video Details**: 1 unit each
- **Trending Videos**: 1 unit each

With the default settings, you can perform approximately:
- 100 searches per day, OR
- 10,000 video detail requests, OR
- A mix of both

## Step 4: Customization Options

### 4.1 Modify Featured Channels

Edit the `FEATURED_CHANNELS` array in `src/config.js` to include your preferred music channels:

```javascript
FEATURED_CHANNELS: [
    'UC-9-kyTW8ZkZNDHQJ6FgpwQ', // Music
    'UCHkj014U2CQ2Nv0UZeYpE_A', // Trap Nation
    'UC7_YxT-KID8kRbqZo7MyscQ', // Proximity
    'UCpDJl2EmP7Oh90Vylx0dZtA', // Selected
    // Add your own channel IDs here
],
```

### 4.2 Adjust Search Parameters

Modify `DEFAULT_SEARCH_PARAMS` in `src/config.js`:

```javascript
DEFAULT_SEARCH_PARAMS: {
    part: 'snippet',
    type: 'video',
    videoCategoryId: '10', // Music category
    maxResults: 25,        // Number of results
    order: 'relevance'     // or 'date', 'rating', 'viewCount'
},
```

### 4.3 Change Region

Update the region code for trending music:

```javascript
// In youtube-api-service.js, modify getTrendingMusic method
regionCode: 'US' // Change to your country code (GB, CA, AU, etc.)
```

## Step 5: Troubleshooting

### Common Issues:

**❌ "YouTube API key not configured" error**
- Make sure you've replaced `YOUR_YOUTUBE_API_KEY_HERE` with your actual API key
- Check that there are no extra spaces or quotes around the key

**❌ "YouTube API error: 403 Forbidden"**
- Your API key might be restricted to certain domains
- Check your API key restrictions in Google Cloud Console
- Make sure the YouTube Data API v3 is enabled

**❌ "YouTube API error: 400 Bad Request"**
- Check that your API key is valid
- Ensure you're not exceeding quota limits

**❌ No music loads, shows demo content**
- Check browser console for error messages
- Verify your internet connection
- Make sure the API key is correctly configured

### Debug Mode:

To enable detailed logging, open browser Developer Tools and check the Console tab. The app will log:
- API requests and responses
- Error messages
- Loading states

## Step 6: Security Best Practices

### 🔒 Protect Your API Key:

1. **Never commit API keys to public repositories**
2. **Use environment variables in production**
3. **Restrict your API key to specific domains**
4. **Monitor your API usage in Google Cloud Console**
5. **Regenerate keys if compromised**

### Production Deployment:

For production deployment, consider:
- Using environment variables instead of hardcoded keys
- Implementing server-side API calls to hide your key
- Setting up proper domain restrictions
- Monitoring API usage and costs

## Step 7: Advanced Features

### Playlist Integration:

The app supports YouTube playlists. You can:
- Search for playlists
- Load playlist contents
- Play entire playlists

### Caching:

The app includes intelligent caching:
- API responses are cached for 5 minutes
- Reduces API quota usage
- Improves performance

### Error Handling:

Robust error handling includes:
- Graceful fallbacks to demo content
- User-friendly error messages
- Automatic retry mechanisms

## Need Help?

If you encounter issues:

1. Check the browser console for error messages
2. Verify your API key is correctly configured
3. Ensure the YouTube Data API v3 is enabled
4. Check your quota usage in Google Cloud Console
5. Review the troubleshooting section above

## API Limits and Costs

The YouTube Data API v3 is free up to 10,000 units per day. Beyond that:
- Additional quota can be requested
- Costs apply for higher usage
- Monitor usage in Google Cloud Console

---

**🎵 Enjoy your enhanced Timbrosa music app with real YouTube content! 🎵** 