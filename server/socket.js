const {Server}=require('socket.io');
const socket={};
function connect(server){
    socket.io=new Server(server);
}
module.exports={
    connect,
    socket
}