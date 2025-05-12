document.addEventListener('DOMContentLoaded', () => {
    // Player controls
    const playPauseBtn = document.querySelector('.play-pause');
    const progressBar = document.querySelector('.progress');
    const progressContainer = document.querySelector('.progress-bar');
    const currentTimeEl = document.querySelector('.current-time');
    const totalTimeEl = document.querySelector('.total-time');
    const volumeLevel = document.querySelector('.volume-level');
    const volumeBar = document.querySelector('.volume-bar');
    const volumeBtn = document.querySelector('.volume-btn');
    const trackCards = document.querySelectorAll('.track-card');
    const featuredItems = document.querySelectorAll('.featured-item');
    const audioPlayer = document.getElementById('audio-player');

    // State
    let isPlaying = false;
    let currentVolume = 0.7; // 70%
    let isMuted = false;
    let previousVolume = currentVolume;

    // Set initial volume
    audioPlayer.volume = currentVolume;

    // Toggle play/pause
    playPauseBtn.addEventListener('click', togglePlayPause);

    function togglePlayPause() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            audioPlayer.play();
        } else {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            audioPlayer.pause();
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
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / width) * duration;
    }

    // Volume controls
    volumeBar.addEventListener('click', setVolume);
    
    function setVolume(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        currentVolume = clickX / width;
        volumeLevel.style.width = `${currentVolume * 100}%`;
        
        audioPlayer.volume = currentVolume;
        
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
            audioPlayer.volume = 0;
        } else {
            currentVolume = previousVolume;
            volumeLevel.style.width = `${currentVolume * 100}%`;
            updateVolumeIcon();
            audioPlayer.volume = currentVolume;
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

    // Track card play buttons
    trackCards.forEach(card => {
        const playBtn = card.querySelector('.play-btn');
        
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click event
            
            // Get track info
            const trackTitle = card.querySelector('h4').textContent;
            const artistName = card.querySelector('p').textContent;
            const artworkSrc = card.querySelector('img').src;
            
            // Update now playing
            document.querySelector('.track-info h4').textContent = trackTitle;
            document.querySelector('.track-info p').textContent = artistName;
            document.querySelector('.current-artwork').src = artworkSrc;
            
            // Start playing
            if (!isPlaying) {
                togglePlayPause();
            }
        });
    });

    // Featured item click
    featuredItems.forEach(item => {
        item.addEventListener('click', () => {
            const playlistName = item.querySelector('h3').textContent;
            console.log(`Opening playlist: ${playlistName}`);
            
            // In a real app, you would navigate to the playlist page
            // or show the playlist content
        });
    });

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
}); 