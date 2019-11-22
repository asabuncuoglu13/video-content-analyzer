'use strict';

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = 8080;

let Client = require('ssh2-sftp-client');
let sftp = new Client();

const config = {
    host: '[host]',
    username: '[username]',
    password: '[pass]'
};

const remoteDir = '/scratch/users/asabuncuoglu13/';

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

    console.log('user connected');

    sftp.connect(config).then(() => {
        return sftp.list(remoteDir);
    }).then(data => {
        console.log(data, 'the data info');
    }).catch(err => {
        console.log(err, 'catch error');
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

server.listen(port, () => console.log('socket is listening'));