var socketio = require('socket.io');

var SOCKET_CHANNEL = "ACCESS_STATUS";
var SOCKET_TAG = "message";
var io;

var emitNotification = function(access) {
    if (io != undefined) {
        console.log(access);
        io.in(SOCKET_CHANNEL).emit(SOCKET_TAG, access);
    }
}

var setUp = function(server) {
    io = socketio().listen(server);
    io.on('connection', function(client) {
        client.on('disconnect', function() {
            console.log('disconnected');
        });

        client.join(SOCKET_CHANNEL);
        console.log('Client joined' + client.id)
    })
}

module.exports.setUp = setUp;
module.exports.emitNotification = emitNotification;