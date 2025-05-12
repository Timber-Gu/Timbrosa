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

    // State
    let isPlaying = false;
    let currentVolume = 0.7; // 70%
    let isMuted = false;
    let previousVolume = currentVolume;

    // Toggle play/pause
    playPauseBtn.addEventListener('click', togglePlayPause);

    function togglePlayPause() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            // In a real app, you would start playing the audio here
        } else {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            // In a real app, you would pause the audio here
        }
    }

    // Update progress bar
    function updateProgress(e) {
        const { duration, currentTime } = e.target;
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

    // Set progress when clicking on progress bar
    progressContainer.addEventListener('click', setProgress);

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const progressPercent = (clickX / width) * 100;
        progressBar.style.width = `${progressPercent}%`;
        
        // In a real app, you would set the audio currentTime here
        // audio.currentTime = (clickX / width) * audio.duration;
    }

    // Volume controls
    volumeBar.addEventListener('click', setVolume);
    
    function setVolume(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        currentVolume = clickX / width;
        volumeLevel.style.width = `${currentVolume * 100}%`;
        
        // In a real app, you would set the audio volume here
        // audio.volume = currentVolume;
        
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
        } else {
            currentVolume = previousVolume;
            volumeLevel.style.width = `${currentVolume * 100}%`;
            updateVolumeIcon();
        }
        
        // In a real app, you would set the audio volume here
        // audio.volume = currentVolume;
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

    // Simulate progress for demo purposes
    let progressInterval;
    
    function startProgressSimulation() {
        let progress = 0;
        progressInterval = setInterval(() => {
            progress += 0.5;
            if (progress > 100) {
                clearInterval(progressInterval);
                isPlaying = false;
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                return;
            }
            progressBar.style.width = `${progress}%`;
            
            // Update time display
            const totalSeconds = 225; // 3:45 in seconds
            const currentSeconds = Math.floor((progress / 100) * totalSeconds);
            const currentMinutes = Math.floor(currentSeconds / 60);
            const remainingSeconds = currentSeconds % 60;
            currentTimeEl.textContent = `${currentMinutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        }, 1000);
    }
    
    function stopProgressSimulation() {
        clearInterval(progressInterval);
    }
    
    // Start/stop progress simulation when play/pause is clicked
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            startProgressSimulation();
        } else {
            stopProgressSimulation();
        }
    });

    // Initialize time display
    currentTimeEl.textContent = '0:00';
    totalTimeEl.textContent = '3:45';

    // Initialize volume display
    volumeLevel.style.width = `${currentVolume * 100}%`;
}); 