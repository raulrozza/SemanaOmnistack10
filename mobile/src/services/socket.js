import socketio from 'socket.io-client'

const socket = socketio('http://192.168.0.105:5000', {
    autoConnect: false,
});

const subscribeToNewDevs = (subscribeFunction) => {
    socket.on('new-dev', subscribeFunction);
}

const connect = (latitude, longitude, techs) => {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs
    }

    socket.connect();
}

const disconnect = () => {
    if(socket.connected)
        socket.disconnect();
}

export {
    connect, disconnect, subscribeToNewDevs
}