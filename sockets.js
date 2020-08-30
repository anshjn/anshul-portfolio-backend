const socket = require(".");

module.exports =  (io) =>  {
    //Socket.IO

    io.on('connection', socket => {
        console.log('User connected');
    });

    
};