"use strict";
var SIO = require('socket.io');
var io = SIO(2222, { serveClient: false });
io.on('connection', newBaseConnectionHandler);

var nsp = io.of("/info");
nsp.on('connection', newNSConnectionHandler)

function newBaseConnectionHandler(socket) {
	console.log("new ws", socket.id);
	socket.on('disconnect', () => { console.log(socket.id, "disconnected") })
	socket.on('join', (data) => { joinHandler(socket, data) });
}

function newNSConnectionHandler(socket) {
	console.log("new NS ws", socket.id);
	socket.on('disconnect', () => { console.log(socket.id, "NS disconnected") })
}

function joinHandler(socket, data) {
	console.log("asking to join");
	socket.emit('join');
}