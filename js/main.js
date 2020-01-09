import { VideoPlayer } from './video.js';
import { PeerConnection } from './peer_connection.js';
import RFB from '../node_modules/@novnc/novnc/core/rfb.js';

const IP = '0.0.0.0';
const SOCKET_PORT = 8080;
const VNC_PORT = 3000;

const playButton = document.getElementById('play-button');
const videoElement = document.getElementById('vid');
const vncScreen = document.getElementById('screen');

const rfb = new RFB(vncScreen, `wss://${IP}:${VNC_PORT}`);

// const videoPlayer = new VideoPlayer(videoElement);
// window.videoPlayer = videoPlayer;

// const socket = io('http://' + IP + ':' + SOCKET_PORT);

// const peer = new PeerConnection(SimplePeer, socket, { initiator: false });
// window.peer = peer;

// peer.ondata = (data) => videoPlayer.push(data);

// playButton.addEventListener('click', () => {
//   if (peer.connected) socket.emit('start-stream');
// });

// socket.on('connect', () => {
//   peer.connect();
// });

// socket.on('disconnect', () => {
//   peer.close();
// });