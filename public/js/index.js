var socket = io();

socket.on('connect', function (){
    console.log('Connected Socket');

    socket.emit('createMessage', {
        from: 'Andrew',
        text: 'Yeah, that works for me'
    })
});

socket.on('disconnect', function (){
    console.log('Disconnected Socket');
});

//custom event
socket.on('newEmail', function (email) {
    console.log('New Email', email);
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message)
})