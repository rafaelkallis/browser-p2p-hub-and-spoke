const Peer = require('peerjs');

const peer = new Peer(undefined, { 
    host: 'localhost',
    port: 3000,
    path: 'peerjs'
});