// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
var http = require('http');
var express = require('express');
var socketio = require('socket.io');
var path = require('path');

var app = express();
var server = http.createServer(app);
var io = socketio(server);

var waitingPlayer;
var clients = 0;

var lobbyManager = new (require('./LobbyManager.js'))(io);

app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    clients++;
    console.log('a user connected. Current users:' + clients);
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    socket.on('smt', function (data) {
       console.log(data);
    });

    socket.join('Sam_room');
    io.to('Sam_room').emit('chat message',"you are in room 1");

    if(waitingPlayer) {
        socket.emit('chat message', 'Match starts');
        waitingPlayer.emit('chat message','Match start too');
        waitingPlayer = null;
    }else{
        waitingPlayer = socket;
        socket.emit('chat message',"waiting for opponent");
    }

    socket.on('waiting', function () {
        lobbyManager.push(socket);
        lobbyManager.dispatch();
    });

    socket.on('disconnect', function(){
            console.log('user disconnected. Current users' + clients);
    });
}
);

server.listen(3000, function(){
    console.log('listening on *:3000');
});


// io.on('connection', function(socket){
//     clients++;
//
//    //io.emit('broadcast',{ description: clients + ' clients connected!'});
//    //  socket.on('msg',function(){
//    //      io.emit('msg')
//    //  });
//     io.emit('msg',{description:'Hellowasdfasdf!'});
//     socket.on('disconnect', function () {
//         clients--;
//         io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
//     });
//
//
// });
//
// server.listen(3000, function(){
//     console.log('listening on localhost:3000');
// });