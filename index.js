const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = 3000;

app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

const sio = require("socket.io")(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});

sio.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

server.listen(port);