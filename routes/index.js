const express= require('express');
const router=express.Router();
const messagesRouter=require('./messages.router');
const usersRouter=require('./users.router');
const chatRouter=require('./chat.router');
const authRouter=require('./auth.router');
function routerApp(app){
    app.use('/api/v1',router);
    router.use('/auth',authRouter);
    router.use('/messages',messagesRouter);
    router.use('/users',usersRouter);
    router.use('/chats',chatRouter);
}   
module.exports=routerApp;