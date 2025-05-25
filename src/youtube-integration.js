// YouTube Music Integration for Timbrosa

// 1. Load the YouTube IFrame Player API code asynchronously
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 2. Create YouTube player object
let youtubePlayer;
function onYouTubeIframeAPIReady() {
  // Replace 'youtube-player' with the ID of your player container
  youtubePlayer = new YT.Player('youtube-player', {
    height: '0',  // Hidden player
    width: '0',
    videoId: 'dQw4w9WgXcQ', // Replace with your music video ID
    playerVars: {
      'playsinline': 1,
      'controls': 0,
      'disablekb': 1,
      'fs': 0,
      'rel': 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 3. API will call this function when the player is ready
function onPlayerReady(event) {
  console.log('YouTube player is ready');
  // Connect to your app's UI
  connectYouTubeToPlayerControls();
}

// 4. API calls this function when the player's state changes
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    updatePlayButton(true);
  } else if (event.data == YT.PlayerState.PAUSED) {
    updatePlayButton(false);
  } else if (event.data == YT.PlayerState.ENDED) {
    updatePlayButton(false);
    // You could play the next track here
  }
}

// 5. Connect YouTube player to your app's UI controls
function connectYouTubeToPlayerControls() {
  const playPauseBtn = document.querySelector('.play-pause');
  const progressBar = document.querySelector('.progress');
  const progressContainer = document.querySelector('.progress-bar');
  const currentTimeEl = document.querySelector('.current-time');
  const totalTimeEl = document.querySelector('.total-time');
  
  // Play/Pause button
  playPauseBtn.addEventListener('click', function() {
    const state = youtubePlayer.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
      youtubePlayer.pauseVideo();
    } else {
      youtubePlayer.playVideo();
    }
  });
  
  // Progress bar click
  progressContainer.addEventListener('click', function(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = youtubePlayer.getDuration();
    youtubePlayer.seekTo((clickX / width) * duration, true);
  });
  
  // Update progress and time displays
  setInterval(function() {
    if (youtubePlayer && youtubePlayer.getCurrentTime) {
      const currentTime = youtubePlayer.getCurrentTime();
      const duration = youtubePlayer.getDuration();
      const progressPercent = (currentTime / duration) * 100;
      
      // Update progress bar
      progressBar.style.width = `${progressPercent}%`;
      
      // Update time displays
      updateTimeDisplay(currentTime, duration);
    }
  }, 1000);
}

// Helper function to update the play/pause button
function updatePlayButton(isPlaying) {
  const playPauseBtn = document.querySelector('.play-pause');
  if (isPlaying) {
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

// Helper function to update time displays
function updateTimeDisplay(currentTime, duration) {
  const currentTimeEl = document.querySelector('.current-time');
  const totalTimeEl = document.querySelector('.total-time');
  
  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60);
  currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
  
  const totalMinutes = Math.floor(duration / 60);
  const totalSeconds = Math.floor(duration % 60);
  totalTimeEl.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
}

// Function to load and play a specific YouTube Music track
function loadYouTubeTrack(videoId, title, artist) {
  // Update player with new video
  youtubePlayer.loadVideoById(videoId);
  
  // Update track info display
  document.querySelector('.track-info h4').textContent = title;
  document.querySelector('.track-info p').textContent = artist;
}

// Example track data (you would typically get this from the YouTube Data API)
const exampleTracks = [
  { id: 'dQw4w9WgXcQ', title: 'Never Gonna Give You Up', artist: 'Rick Astley' },
  { id: '9bZkp7q19f0', title: 'Gangnam Style', artist: 'PSY' },
  { id: 'JGwWNGJdvx8', title: 'Shape of You', artist: 'Ed Sheeran' }
];

// Function to search YouTube Music (would require YouTube Data API)
// This is just a placeholder - you would need to implement the actual API call
function searchYouTubeMusic(query) {
  console.log(`Searching for: ${query}`);
  // In a real implementation, you would:
  // 1. Make an API call to YouTube Data API
  // 2. Process the results
  // 3. Display them in your UI
} 