// Configuration file for Timbrosa Music App
const CONFIG = {
    // YouTube Data API v3 Configuration
    // Try to get API key from environment variable first, then fallback to placeholder
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || 
                     (typeof window !== 'undefined' && window.YOUTUBE_API_KEY) || 
                     'YOUR_YOUTUBE_API_KEY_HERE', // Replace with your actual API key for local development
    YOUTUBE_API_BASE_URL: 'https://www.googleapis.com/youtube/v3',
    
    // Default search parameters
    DEFAULT_SEARCH_PARAMS: {
        part: 'snippet',
        type: 'video',
        videoCategoryId: '10', // Music category
        maxResults: 25,
        order: 'relevance'
    },
    
    // Popular music channels for featured content
    FEATURED_CHANNELS: [
        'UC-9-kyTW8ZkZNDHQJ6FgpwQ', // Music
        'UCHkj014U2CQ2Nv0UZeYpE_A', // Trap Nation
        'UC7_YxT-KID8kRbqZo7MyscQ', // Proximity
        'UCpDJl2EmP7Oh90Vylx0dZtA'  // Selected
    ],
    
    // App settings
    APP_SETTINGS: {
        defaultVolume: 0.7,
        autoplay: false,
        shuffle: false,
        repeat: false
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
} 