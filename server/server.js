const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');


const publicPath = path.join(__dirname, '../public');


var app = express();
var server = http.createServer(app);
var io = socketio(server);

io.on('connection', (socket)=>{
    console.log('New User connected');

    socket.emit('newEmail', {
        from: 'mike@example.com',
        text: 'Hi, Sehun',
        createAt: 123
    });

    socket.on('createEmail', (newEmail)=>{
        console.log('createEmail', newEmail);
    });

    socket.on('disconnect', ()=>{
        console.log('disconnected!!');
    })
});



app.use(express.static(publicPath));
server.listen(3000, ()=>{
    console.log('Server is up on port 3000');
})