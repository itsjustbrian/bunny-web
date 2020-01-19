import { VideoPlayer } from './video.js';
import RFB from '../node_modules/@novnc/novnc/core/rfb.js';

const IP = '0.0.0.0';
const SOCKET_PORT = 8080;
const VNC_PORT = 3000;

const playButton = document.getElementById('play-button');
const videoElement = document.getElementById('vid');
//videoElement.crossOrigin = 'anonymous';
const vncScreen = document.getElementById('screen');

const rfb = new RFB(vncScreen, `ws://${IP}:${VNC_PORT}`);
window.rfb = rfb;

// const videoPlayer = new VideoPlayer(videoElement);
// window.videoPlayer = videoPlayer;

// const playVideo = () => {
//   if (Hls.isSupported()) {
//     const hls = new Hls();
//     hls.loadSource('http://0.0.0.0:8081/pool.m3u8');
//     hls.attachMedia(videoElement);
//     hls.on(Hls.Events.MANIFEST_PARSED, () => {
//       videoElement.play();
//     });
//   }
// };

const playVideo = () => {
  // Create a Player instance.
  const player = new shaka.Player(videoElement);

  player.configure({
    streaming: {
      rebufferingGoal: 2
    }
  });

  // Attach player to the window to make it easy to access in the JS console.
  window.player = player;

  // Listen for error events.
  player.addEventListener('error', onErrorEvent);

  // Try to load a manifest.
  // This is an asynchronous process.
  player.load('http://0.0.0.0:8081/manifest.mpd').then(function () {
    // This runs if the asynchronous load is successful.
    console.log('The video has now been loaded!');
    //videoElement.play();
  }).catch(onError);  // onError is executed if the asynchronous load fails.
};
function onErrorEvent(event) {
  // Extract the shaka.util.Error object from the event.
  onError(event.detail);
}
function onError(error) {
  // Log the error.
  console.error('Error code', error.code, 'object', error);
}


// const socket = io('http://' + IP + ':' + SOCKET_PORT);

playButton.addEventListener('click', () => {
  //socket.emit('start-stream');
  playVideo();
});

// socket.on('data', (data) => {
//   videoPlayer.push(data);
// });