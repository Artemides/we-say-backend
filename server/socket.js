const { Server } = require('socket.io');
const socket = {};
function connect(server) {
  socket.io = new Server(server, {
    cors: {
      origin: 'https://we-say.netlify.app',
      credentials: true,
    },
  });
  serve(socket.io);
}
global.usersOnline = new Map();
function serve(io) {
  io.on('connection', (socket) => {
    socket.on('user-online', (userId) => {
      global.usersOnline.set(userId, socket.id);
      io.emit('set-online', userId);
      io.emit('online-users',{users:Array.from(global.usersOnline.keys())});
    });
    socket.on('disconnect', () => {
      global.usersOnline.forEach((value, key) => {
        if (value === socket.id) {
          io.emit('set-offline',key);
          global.usersOnline.delete(key);
        }
      });
    });
    
    
});
}

module.exports = {
  connect,
  socket,
};
