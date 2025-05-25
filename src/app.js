document.addEventListener('DOMContentLoaded', async () => {
    // Player controls
    const playPauseBtn = document.querySelector('.play-pause');
    const progressBar = document.querySelector('.progress');
    const progressContainer = document.querySelector('.progress-bar');
    const currentTimeEl = document.querySelector('.current-time');
    const totalTimeEl = document.querySelector('.total-time');
    const volumeLevel = document.querySelector('.volume-level');
    const volumeBar = document.querySelector('.volume-bar');
    const volumeBtn = document.querySelector('.volume-btn');
    const audioPlayer = document.getElementById('audio-player');

    // Content containers
    const trackGrid = document.querySelector('.track-grid');
    const featuredGrid = document.querySelector('.featured-grid');

    // State
    let isPlaying = false;
    let currentVolume = 0.7; // 70%
    let isMuted = false;
    let previousVolume = currentVolume;
    let currentTrack = null;
    let playlist = [];
    let currentTrackIndex = 0;

    // Set initial volume
    audioPlayer.volume = currentVolume;

    // Initialize the app
    await initializeApp();

    async function initializeApp() {
        try {
            // Check if YouTube API is configured
            if (!youtubeAPI.isConfigured()) {
                showNoAPIBanner();
                loadDemoContent();
                return;
            }

            // Hide API banner if key is configured
            hideNoAPIBanner();

            // Load real content from YouTube
            await loadFeaturedContent();
            await loadTrendingMusic();
            
            // Set up search functionality
            setupSearch();
            
            console.log('Timbrosa initialized with YouTube Music integration!');
        } catch (error) {
            console.error('Failed to initialize app:', error);
            showErrorMessage('Failed to load music content. Please check your internet connection.');
            loadDemoContent();
        }
    }

    // Load featured content
    async function loadFeaturedContent() {
        try {
            const featuredVideos = await youtubeAPI.getFeaturedContent(4);
            updateFeaturedGrid(featuredVideos);
        } catch (error) {
            console.error('Failed to load featured content:', error);
        }
    }

    // Load trending music
    async function loadTrendingMusic() {
        try {
            const trendingMusic = await youtubeAPI.getTrendingMusic(10);
            playlist = trendingMusic;
            updateTrackGrid(trendingMusic);
        } catch (error) {
            console.error('Failed to load trending music:', error);
        }
    }

    // Update featured grid with real data
    function updateFeaturedGrid(videos) {
        if (!featuredGrid || !videos.length) return;

        featuredGrid.innerHTML = videos.map((video, index) => `
            <div class="featured-item" data-video-id="${video.id}">
                <img src="${video.thumbnail}" alt="${video.title}" onerror="this.src='/src/assets/placeholder${(index % 4) + 1}.jpg'">
                <h3>${video.title}</h3>
                <p>${video.artist}</p>
            </div>
        `).join('');

        // Add click listeners to featured items
        document.querySelectorAll('.featured-item').forEach(item => {
            item.addEventListener('click', async () => {
                const videoId = item.dataset.videoId;
                const video = videos.find(v => v.id === videoId);
                if (video) {
                    await playTrack(video);
                }
            });
        });
    }

    // Update track grid with real data
    function updateTrackGrid(tracks) {
        if (!trackGrid || !tracks.length) return;

        trackGrid.innerHTML = tracks.map((track, index) => `
            <div class="track-card" data-track-index="${index}">
                <div class="track-artwork">
                    <img src="${track.thumbnail}" alt="${track.title}" onerror="this.src='/src/assets/track${(index % 5) + 1}.jpg'">
                    <button class="play-btn"><i class="fas fa-play"></i></button>
                </div>
                <h4>${track.title}</h4>
                <p>${track.artist}</p>
                ${track.duration ? `<span class="duration">${youtubeAPI.formatDuration(track.duration)}</span>` : ''}
            </div>
        `).join('');

        // Add click listeners to track cards
        document.querySelectorAll('.track-card').forEach(card => {
            const playBtn = card.querySelector('.play-btn');
            const trackIndex = parseInt(card.dataset.trackIndex);
            
            playBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                await playTrackByIndex(trackIndex);
            });

            card.addEventListener('click', async () => {
                await playTrackByIndex(trackIndex);
            });
        });
    }

    // Play track by index
    async function playTrackByIndex(index) {
        if (index >= 0 && index < playlist.length) {
            currentTrackIndex = index;
            await playTrack(playlist[index]);
        }
    }

    // Play a specific track
    async function playTrack(track) {
        try {
            // Check if API key is configured for real tracks
            if (!youtubeAPI.isConfigured() && !track.id.startsWith('demo')) {
                showAPIKeyModal();
                return;
            }

            currentTrack = track;
            
            // Update now playing display
            updateNowPlaying(track);
            
            // Load track in YouTube player if available
            if (window.youtubePlayer && window.loadYouTubeTrack) {
                loadYouTubeTrack(track.id, track.title, track.artist);
            } else {
                // Fallback to audio player (won't work for YouTube videos)
                console.log('YouTube player not available, using fallback');
            }
            
            // Update UI
            if (!isPlaying) {
                togglePlayPause();
            }
            
        } catch (error) {
            console.error('Failed to play track:', error);
            showErrorMessage('Failed to play track. Please try another song.');
        }
    }

    // Update now playing display
    function updateNowPlaying(track) {
        const trackInfo = document.querySelector('.track-info');
        const currentArtwork = document.querySelector('.current-artwork');
        
        if (trackInfo) {
            const titleEl = trackInfo.querySelector('h4');
            const artistEl = trackInfo.querySelector('p');
            
            if (titleEl) titleEl.textContent = track.title;
            if (artistEl) artistEl.textContent = track.artist;
        }
        
        if (currentArtwork) {
            currentArtwork.src = track.thumbnail;
            currentArtwork.alt = `${track.title} by ${track.artist}`;
        }
    }

    // Setup search functionality
    function setupSearch() {
        // Create search input if it doesn't exist
        let searchInput = document.querySelector('.search-input');
        if (!searchInput) {
            const searchNav = document.querySelector('nav ul li:nth-child(2)');
            if (searchNav) {
                searchNav.innerHTML = `
                    <div class="search-container">
                        <i class="fas fa-search"></i>
                        <input type="text" class="search-input" placeholder="Search for music...">
                    </div>
                `;
                searchInput = document.querySelector('.search-input');
            }
        }

        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                const query = e.target.value.trim();
                
                if (query.length > 2) {
                    searchTimeout = setTimeout(() => performSearch(query), 500);
                } else if (query.length === 0) {
                    loadTrendingMusic(); // Reset to trending when search is cleared
                }
            });
        }
    }

    // Perform search
    async function performSearch(query) {
        try {
            // Check if API key is configured
            if (!youtubeAPI.isConfigured()) {
                showAPIKeyModal();
                return;
            }

            showLoadingState();
            const searchResults = await youtubeAPI.searchMusic(query, 20);
            playlist = searchResults;
            updateTrackGrid(searchResults);
            hideLoadingState();
        } catch (error) {
            console.error('Search failed:', error);
            showErrorMessage('Search failed. Please try again.');
            hideLoadingState();
        }
    }

    // Show loading state
    function showLoadingState() {
        if (trackGrid) {
            trackGrid.innerHTML = '<div class="loading">Searching for music...</div>';
        }
    }

    // Hide loading state
    function hideLoadingState() {
        // Loading state will be replaced by search results
    }

    // Show error message
    function showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Load demo content (fallback)
    function loadDemoContent() {
        const demoTracks = [
            { id: 'demo1', title: 'Demo Song 1', artist: 'Demo Artist 1', thumbnail: '/src/assets/track1.jpg' },
            { id: 'demo2', title: 'Demo Song 2', artist: 'Demo Artist 2', thumbnail: '/src/assets/track2.jpg' },
            { id: 'demo3', title: 'Demo Song 3', artist: 'Demo Artist 3', thumbnail: '/src/assets/track3.jpg' },
            { id: 'demo4', title: 'Demo Song 4', artist: 'Demo Artist 4', thumbnail: '/src/assets/track4.jpg' },
            { id: 'demo5', title: 'Demo Song 5', artist: 'Demo Artist 5', thumbnail: '/src/assets/track5.jpg' }
        ];
        
        playlist = demoTracks;
        updateTrackGrid(demoTracks);
    }

    // Toggle play/pause
    playPauseBtn.addEventListener('click', togglePlayPause);

    function togglePlayPause() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            if (window.youtubePlayer) {
                youtubePlayer.playVideo();
            } else {
                audioPlayer.play();
            }
        } else {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            if (window.youtubePlayer) {
                youtubePlayer.pauseVideo();
            } else {
                audioPlayer.pause();
            }
        }
    }

    // Update progress bar as audio plays
    audioPlayer.addEventListener('timeupdate', updateProgress);

    // Update progress bar
    function updateProgress() {
        const { duration, currentTime } = audioPlayer;
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
            
            // Update time displays
            const currentMinutes = Math.floor(currentTime / 60);
            const currentSeconds = Math.floor(currentTime % 60);
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
            
            const totalMinutes = Math.floor(duration / 60);
            const totalSeconds = Math.floor(duration % 60);
            totalTimeEl.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
        }
    }

    // Set progress when clicking on progress bar
    progressContainer.addEventListener('click', setProgress);

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        
        if (window.youtubePlayer) {
            const duration = youtubePlayer.getDuration();
            youtubePlayer.seekTo((clickX / width) * duration, true);
        } else {
            const duration = audioPlayer.duration;
            audioPlayer.currentTime = (clickX / width) * duration;
        }
    }

    // Volume controls
    volumeBar.addEventListener('click', setVolume);
    
    function setVolume(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        currentVolume = clickX / width;
        volumeLevel.style.width = `${currentVolume * 100}%`;
        
        if (window.youtubePlayer) {
            youtubePlayer.setVolume(currentVolume * 100);
        } else {
            audioPlayer.volume = currentVolume;
        }
        
        // Update volume icon based on level
        updateVolumeIcon();
    }
    
    volumeBtn.addEventListener('click', toggleMute);
    
    function toggleMute() {
        isMuted = !isMuted;
        
        if (isMuted) {
            previousVolume = currentVolume;
            currentVolume = 0;
            volumeLevel.style.width = '0%';
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            
            if (window.youtubePlayer) {
                youtubePlayer.setVolume(0);
            } else {
                audioPlayer.volume = 0;
            }
        } else {
            currentVolume = previousVolume;
            volumeLevel.style.width = `${currentVolume * 100}%`;
            updateVolumeIcon();
            
            if (window.youtubePlayer) {
                youtubePlayer.setVolume(currentVolume * 100);
            } else {
                audioPlayer.volume = currentVolume;
            }
        }
    }
    
    function updateVolumeIcon() {
        if (currentVolume === 0) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (currentVolume < 0.5) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }

    // Handle audio ending
    audioPlayer.addEventListener('ended', () => {
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        progressBar.style.width = '0%';
        currentTimeEl.textContent = '0:00';
    });

    // Load audio metadata when available
    audioPlayer.addEventListener('loadedmetadata', () => {
        const duration = audioPlayer.duration;
        const totalMinutes = Math.floor(duration / 60);
        const totalSeconds = Math.floor(duration % 60);
        totalTimeEl.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
    });

    // Initialize time display
    currentTimeEl.textContent = '0:00';
    
    // Initialize volume display
    volumeLevel.style.width = `${currentVolume * 100}%`;

    // Navigation controls
    const prevBtn = document.querySelector('.control-btn:nth-child(2)');
    const nextBtn = document.querySelector('.control-btn:nth-child(4)');

    if (prevBtn) {
        prevBtn.addEventListener('click', playPreviousTrack);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', playNextTrack);
    }

    function playPreviousTrack() {
        if (currentTrackIndex > 0) {
            playTrackByIndex(currentTrackIndex - 1);
        }
    }

    function playNextTrack() {
        if (currentTrackIndex < playlist.length - 1) {
            playTrackByIndex(currentTrackIndex + 1);
        }
    }

    // Make functions globally available for YouTube integration
    window.timbrosaApp = {
        playTrack,
        updateNowPlaying,
        togglePlayPause,
        updateProgress,
        playlist,
        currentTrackIndex
    };

    // Modal and Banner Management Functions
    function showAPIKeyModal() {
        const modal = document.getElementById('apiKeyModal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    function closeModal() {
        const modal = document.getElementById('apiKeyModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }

    function showNoAPIBanner() {
        const banner = document.getElementById('noApiBanner');
        if (banner) {
            banner.style.display = 'block';
        }
    }

    function hideNoAPIBanner() {
        const banner = document.getElementById('noApiBanner');
        if (banner) {
            banner.style.display = 'none';
        }
    }

    function openSetupGuide() {
        window.open('SETUP_GUIDE.md', '_blank');
    }

    function openGoogleConsole() {
        window.open('https://console.cloud.google.com/apis/library/youtube.googleapis.com', '_blank');
    }

    function testWithoutAPI() {
        closeModal();
        // Load demo content and hide banner temporarily
        loadDemoContent();
        hideNoAPIBanner();
        showErrorMessage('Demo mode activated. Set up API key for real music content.');
    }

    // Make modal functions globally available
    window.showAPIKeyModal = showAPIKeyModal;
    window.closeModal = closeModal;
    window.openSetupGuide = openSetupGuide;
    window.openGoogleConsole = openGoogleConsole;
    window.testWithoutAPI = testWithoutAPI;

    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('apiKeyModal');
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}); 