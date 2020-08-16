const http = require('http');
const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();

app.get('/hub', (req, res) => res.sendFile(__dirname + "/hub.html"));
app.get('/spoke', (req, res) => res.sendFile(__dirname + "/spoke.html"));

let roomSequence = 1;
const rooms = {};

app.post('/rooms', (req, res) => {
    const peerId = req.headers['x-peer-id'];
    const roomId = roomSequence++;
    const room = { id: roomId, managerId: peerId }
    rooms[roomId] = room;
    console.log('room created:', room);
    res.send(room);
});

app.get('/rooms/:id', (req, res) => {
    const room = rooms[req.params.id];
    if (!room) return res.status(404);
    res.status(200).send(room);
});

const server = http.createServer(app);
const peerServer = ExpressPeerServer(server, {
//   debug: true,
//   path: '/',
//   proxied: true,
});
peerServer.on('connection', (client) => console.log(`new connection from: ${client.getId()}`));

app.use('/peerjs', peerServer);

server.listen(3000);