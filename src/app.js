// Preload image
(new Image()).src = 'src/img/alert.png';

var settings = {};
if (location.hash) {
  try {
    settings = JSON.parse(atob(location.hash.substring(1)));
  }
  catch(e) {}
}

// Set defaults
settings.videoId = settings.videoId || 'qN4w5D2tzME';
settings.message = settings.message || 'Woomy';
settings.videoStartTime = settings.videoStartTime || 0;
settings.alertTime = settings.alertTime || (settings.videoStartTime + 5);

document.getElementById('alert-text').innerText = settings.message;

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: settings.videoId,
    playerVars: {
      start: settings.videoStartTime,
      controls: 0,
      showinfo: 0,
      rel: 0,
    },
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function checkForAlertTime() {
  if (player.getCurrentTime() > settings.alertTime) {
    showAlert();
  }
}

var checkForAlertTimeInterval;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    checkForAlertTimeInterval = setInterval(checkForAlertTime, 500);
  }
  else {
    clearInterval(checkForAlertTimeInterval);
  }
}

function showAlert() {
  player.pauseVideo();
  document.getElementById('player').classList.add('blurred');
  document.getElementById('alert').classList.add('show');
  document.getElementById('drip-audio').play();
}

function dismissAlert() {
  document.getElementById('loading-overlay').classList.add('show');
}

document.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13 || event.keyCode === 65) { // 'enter' or 'a'
      dismissAlert();
    }
});