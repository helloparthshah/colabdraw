var express = require('express');

var app = express();

var server = app.listen(5000, () => {
    console.log(`Listening on port 5000`);
});

app.use(express.static('.'));

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', (socket) => {
    console.log('New connection: ' + socket.id);

    socket.on('path', (data) => {
        socket.broadcast.emit('path', data);
        // console.log(data);
    });

    socket.on('clear', (data) => {
        socket.broadcast.emit('clear', data);
        // console.log(data);
    });
});