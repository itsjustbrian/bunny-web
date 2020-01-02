import { VideoPlayer } from './video.js';
import { PeerConnection } from './peer_connection.js';

const IP = '0.0.0.0';
const PORT = 8080;

const playButton = document.getElementById('play-button');
const videoElement = document.getElementById('vid');

const videoPlayer = new VideoPlayer(videoElement);
window.videoPlayer = videoPlayer;

const socket = io('http://' + IP + ':' + PORT);

const peer = new PeerConnection(SimplePeer, socket, { initiator: false });
window.peer = peer;

peer.ondata = (data) => videoPlayer.push(data);

playButton.addEventListener('click', () => {
  if (peer.connected) socket.emit('start-stream');
});

socket.on('connect', () => {
  peer.connect();
});

socket.on('disconnect', () => {
  peer.close();
});