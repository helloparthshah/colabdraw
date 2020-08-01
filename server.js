var express = require('express');

var app = express();

app.use(express.static('public'));

app.get("/", function(req, res) {
    res.send("<h1>Hello World!</h1>")
})

var port = process.env.PORT || 5000;

var server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

var socket = require('socket.io');

var io = socket(server);

io.configure(function() {
    io.set("transports", ["xhr-polling"]);
    io.set("polling duration", 10);
});

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