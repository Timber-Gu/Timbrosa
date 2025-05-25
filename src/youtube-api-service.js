// YouTube API Service for Timbrosa Music App
class YouTubeAPIService {
    constructor() {
        this.apiKey = CONFIG.YOUTUBE_API_KEY;
        this.baseUrl = CONFIG.YOUTUBE_API_BASE_URL;
        this.cache = new Map(); // Simple caching mechanism
        this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
    }

    // Check if API key is configured
    isConfigured() {
        return this.apiKey && this.apiKey !== 'YOUR_YOUTUBE_API_KEY_HERE';
    }

    // Generic API request method
    async makeRequest(endpoint, params = {}) {
        if (!this.isConfigured()) {
            throw new Error('YouTube API key not configured. Please add your API key to config.js');
        }

        // Add API key to parameters
        params.key = this.apiKey;

        // Build URL with parameters
        const url = new URL(`${this.baseUrl}/${endpoint}`);
        Object.keys(params).forEach(key => {
            if (params[key] !== undefined && params[key] !== null) {
                url.searchParams.append(key, params[key]);
            }
        });

        // Check cache first
        const cacheKey = url.toString();
        const cached = this.cache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
            return cached.data;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            
            // Cache the response
            this.cache.set(cacheKey, {
                data: data,
                timestamp: Date.now()
            });

            return data;
        } catch (error) {
            console.error('YouTube API request failed:', error);
            throw error;
        }
    }

    // Search for music videos
    async searchMusic(query, maxResults = 25) {
        const params = {
            ...CONFIG.DEFAULT_SEARCH_PARAMS,
            q: query,
            maxResults: maxResults
        };

        const response = await this.makeRequest('search', params);
        return this.formatSearchResults(response.items || []);
    }

    // Get trending music videos
    async getTrendingMusic(maxResults = 25) {
        const params = {
            part: 'snippet,statistics',
            chart: 'mostPopular',
            videoCategoryId: '10', // Music category
            maxResults: maxResults,
            regionCode: 'US' // You can make this configurable
        };

        const response = await this.makeRequest('videos', params);
        return this.formatVideoResults(response.items || []);
    }

    // Get videos from featured channels
    async getFeaturedContent(maxResults = 10) {
        const featuredVideos = [];
        
        for (const channelId of CONFIG.FEATURED_CHANNELS) {
            try {
                const params = {
                    part: 'snippet',
                    channelId: channelId,
                    type: 'video',
                    order: 'date',
                    maxResults: Math.ceil(maxResults / CONFIG.FEATURED_CHANNELS.length)
                };

                const response = await this.makeRequest('search', params);
                const videos = this.formatSearchResults(response.items || []);
                featuredVideos.push(...videos);
            } catch (error) {
                console.warn(`Failed to fetch content from channel ${channelId}:`, error);
            }
        }

        // Shuffle and limit results
        return this.shuffleArray(featuredVideos).slice(0, maxResults);
    }

    // Get video details by ID
    async getVideoDetails(videoId) {
        const params = {
            part: 'snippet,contentDetails,statistics',
            id: videoId
        };

        const response = await this.makeRequest('videos', params);
        if (response.items && response.items.length > 0) {
            return this.formatVideoDetails(response.items[0]);
        }
        return null;
    }

    // Get playlist videos
    async getPlaylistVideos(playlistId, maxResults = 50) {
        const params = {
            part: 'snippet',
            playlistId: playlistId,
            maxResults: maxResults
        };

        const response = await this.makeRequest('playlistItems', params);
        return this.formatPlaylistItems(response.items || []);
    }

    // Search for playlists
    async searchPlaylists(query, maxResults = 25) {
        const params = {
            part: 'snippet',
            type: 'playlist',
            q: query,
            maxResults: maxResults
        };

        const response = await this.makeRequest('search', params);
        return this.formatPlaylistResults(response.items || []);
    }

    // Format search results
    formatSearchResults(items) {
        return items.map(item => ({
            id: item.id.videoId,
            title: this.cleanTitle(item.snippet.title),
            artist: item.snippet.channelTitle,
            thumbnail: this.getBestThumbnail(item.snippet.thumbnails),
            duration: null, // Will be fetched separately if needed
            publishedAt: item.snippet.publishedAt,
            description: item.snippet.description,
            channelId: item.snippet.channelId
        }));
    }

    // Format video results (with statistics)
    formatVideoResults(items) {
        return items.map(item => ({
            id: item.id,
            title: this.cleanTitle(item.snippet.title),
            artist: item.snippet.channelTitle,
            thumbnail: this.getBestThumbnail(item.snippet.thumbnails),
            duration: this.parseDuration(item.contentDetails?.duration),
            publishedAt: item.snippet.publishedAt,
            viewCount: item.statistics?.viewCount,
            likeCount: item.statistics?.likeCount,
            description: item.snippet.description,
            channelId: item.snippet.channelId
        }));
    }

    // Format video details
    formatVideoDetails(item) {
        return {
            id: item.id,
            title: this.cleanTitle(item.snippet.title),
            artist: item.snippet.channelTitle,
            thumbnail: this.getBestThumbnail(item.snippet.thumbnails),
            duration: this.parseDuration(item.contentDetails.duration),
            publishedAt: item.snippet.publishedAt,
            viewCount: item.statistics.viewCount,
            likeCount: item.statistics.likeCount,
            description: item.snippet.description,
            channelId: item.snippet.channelId,
            tags: item.snippet.tags || []
        };
    }

    // Format playlist items
    formatPlaylistItems(items) {
        return items.map(item => ({
            id: item.snippet.resourceId.videoId,
            title: this.cleanTitle(item.snippet.title),
            artist: item.snippet.channelTitle,
            thumbnail: this.getBestThumbnail(item.snippet.thumbnails),
            position: item.snippet.position,
            publishedAt: item.snippet.publishedAt,
            description: item.snippet.description
        }));
    }

    // Format playlist results
    formatPlaylistResults(items) {
        return items.map(item => ({
            id: item.id.playlistId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: this.getBestThumbnail(item.snippet.thumbnails),
            channelTitle: item.snippet.channelTitle,
            publishedAt: item.snippet.publishedAt
        }));
    }

    // Helper: Get best quality thumbnail
    getBestThumbnail(thumbnails) {
        if (!thumbnails) return '/src/assets/placeholder1.jpg';
        
        // Prefer higher quality thumbnails
        if (thumbnails.maxres) return thumbnails.maxres.url;
        if (thumbnails.high) return thumbnails.high.url;
        if (thumbnails.medium) return thumbnails.medium.url;
        if (thumbnails.default) return thumbnails.default.url;
        
        return '/src/assets/placeholder1.jpg';
    }

    // Helper: Clean video titles (remove common music video indicators)
    cleanTitle(title) {
        return title
            .replace(/\(Official Video\)/gi, '')
            .replace(/\(Official Music Video\)/gi, '')
            .replace(/\(Official Audio\)/gi, '')
            .replace(/\(Lyric Video\)/gi, '')
            .replace(/\(Lyrics\)/gi, '')
            .replace(/\[Official Video\]/gi, '')
            .replace(/\[Official Music Video\]/gi, '')
            .replace(/\[Official Audio\]/gi, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    // Helper: Parse YouTube duration format (PT4M13S -> seconds)
    parseDuration(duration) {
        if (!duration) return null;
        
        const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        if (!match) return null;
        
        const hours = parseInt(match[1] || 0);
        const minutes = parseInt(match[2] || 0);
        const seconds = parseInt(match[3] || 0);
        
        return hours * 3600 + minutes * 60 + seconds;
    }

    // Helper: Format seconds to MM:SS
    formatDuration(seconds) {
        if (!seconds) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Helper: Shuffle array
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Clear cache
    clearCache() {
        this.cache.clear();
    }
}

// Create global instance
const youtubeAPI = new YouTubeAPIService();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = YouTubeAPIService;
} else {
    window.youtubeAPI = youtubeAPI;
} 