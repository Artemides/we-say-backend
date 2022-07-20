const {Server}=require('socket.io');
const socket={};
function connect(server){
    socket.io=new Server(server,{
        cors:{
            origin:'https://62d769ecd1e587000a53a888--dashing-heliotrope-75cc5a.netlify.app',
            credentials:true
        }
    });
    serve(socket.io);
}
global.usersOnline=new Map();
function serve(io){
    io.on("connection",(socket)=>{
        socket.on('user-online',(userId)=>{
            global.usersOnline.set(userId,socket.id);
            console.log(global.usersOnline);
        })

    })
    io.on('disconnect',()=>{
        global.usersOnline.forEach((value,key)=>{
            if(value===socket.id){
                global.usersOnline.delete(key);
            }
        })
        console.log(global.usersOnline);
    })
}

module.exports={
    connect,
    socket
}