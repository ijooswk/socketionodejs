var socket = io();

socket.on('connect', function (){
    console.log('Connected Socket');

    socket.emit('createEmail', {
        to: 'Jen@example.com',
        text: 'Hey, This is Andrew'
    })
});

socket.on('disconnect', function (){
    console.log('Disconnected Socket');
});

//custom event
socket.on('newEmail', function (email) {
    console.log('New Email', email);
});