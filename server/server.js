const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const msg = require('./utils/message')

const publicPath = path.join(__dirname, '../public');


var app = express();
var server = http.createServer(app);
var io = socketio(server);

io.on('connection', (socket)=>{
    console.log('New User connected');

    socket.on('createEmail', (newEmail)=>{
        console.log('createEmail', newEmail);
    });

    socket.on('disconnect', ()=>{
        console.log('disconnected!!');
    });

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app'
    });

    socket.broadcast.emit('newMessage', msg.generateMessage('Admin', 'New User Joined'));
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New User Joined',
        createdAt: new Date().getTime()
    });
    socket.on('createMessage', function(message, fn){
        console.log('createMessage', message);
        
        io.emit('newMessage', msg.generateMessage(message.from, message.to));
        
        fn('ack1');

        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

});



app.use(express.static(publicPath));
server.listen(3000, ()=>{
    console.log('Server is up on port 3000');
})