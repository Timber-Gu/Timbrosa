# Secure Setup Guide for Timbrosa

This guide shows you how to securely configure your YouTube API key without exposing it in your repository.

## 🔒 Secure Local Development Setup

### Method 1: Local Config File (Recommended)

1. **Copy the example config:**
   ```bash
   cp src/config.local.example.js src/config.local.js
   ```

2. **Edit `src/config.local.js`:**
   ```javascript
   // Replace with your actual API key
   window.YOUTUBE_API_KEY = 'AIzaSyC4E1Pf0aAhiGsSxd2u0kp6NABJwAp_DVg';
   ```

3. **The file is automatically ignored by Git** (see `.gitignore`)

### Method 2: Browser Console (Quick Testing)

1. Open your browser's Developer Tools (F12)
2. Go to the Console tab
3. Set your API key:
   ```javascript
   window.YOUTUBE_API_KEY = 'YOUR_ACTUAL_API_KEY_HERE';
   ```
4. Refresh the page

## 🚀 Production Deployment Options

### Option A: Environment Variables (Netlify/Vercel)

1. **For Netlify:**
   - Go to Site Settings → Environment Variables
   - Add: `YOUTUBE_API_KEY` = `your_api_key`

2. **For Vercel:**
   - Go to Project Settings → Environment Variables
   - Add: `YOUTUBE_API_KEY` = `your_api_key`

### Option B: Build-time Replacement

Create a build script that replaces the placeholder:

```javascript
// build.js
const fs = require('fs');
const config = fs.readFileSync('src/config.js', 'utf8');
const updated = config.replace('YOUR_YOUTUBE_API_KEY_HERE', process.env.YOUTUBE_API_KEY);
fs.writeFileSync('dist/config.js', updated);
```

### Option C: Server-side Proxy (Most Secure)

Create a backend API that proxies YouTube requests:

```javascript
// server.js (Node.js example)
app.get('/api/youtube/search', async (req, res) => {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&${req.query}`);
  res.json(await response.json());
});
```

## 🛡️ Security Best Practices

### ✅ DO:
- Use environment variables in production
- Keep API keys in local config files (ignored by Git)
- Set up API key restrictions in Google Cloud Console
- Monitor your API usage regularly
- Use HTTPS for all requests

### ❌ DON'T:
- Commit API keys to Git repositories
- Share API keys in chat/email
- Use the same key for multiple projects
- Ignore quota warnings

## 🔧 API Key Restrictions (Google Cloud Console)

1. **Go to Google Cloud Console → APIs & Services → Credentials**
2. **Click on your API key**
3. **Set Application Restrictions:**
   - Choose "HTTP referrers (web sites)"
   - Add your domains: `https://yourdomain.com/*`
4. **Set API Restrictions:**
   - Select "YouTube Data API v3"

## 🚨 If Your API Key is Compromised

1. **Immediately regenerate** your API key in Google Cloud Console
2. **Update** all your applications with the new key
3. **Review** your usage logs for suspicious activity
4. **Set up** proper restrictions on the new key

## 📱 Local Development Workflow

1. **Clone the repository**
2. **Copy the example config:**
   ```bash
   cp src/config.local.example.js src/config.local.js
   ```
3. **Add your API key** to `src/config.local.js`
4. **Open `index.html`** in your browser
5. **Start developing!**

The `config.local.js` file is automatically ignored by Git, so your API key stays secure.

## 🔍 Troubleshooting

**"No local config found" in console:**
- This is normal if you haven't created `config.local.js` yet
- The app will use the default placeholder

**API key not working:**
- Check that you've enabled YouTube Data API v3
- Verify your API key restrictions
- Make sure you're not exceeding quota limits

**Still seeing placeholder in production:**
- Make sure your deployment platform has the environment variable set
- Check that your build process is replacing the placeholder

---

**Remember: Never commit real API keys to version control!** 🔐 