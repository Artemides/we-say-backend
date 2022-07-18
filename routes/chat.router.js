const express = require('express');
const passport= require('passport');
const router = express.Router();
const ChatService=require('../services/chat.services');
const {createChatSchema}=require('../Schemas/chat.schema');
const {ValidatorSchemaHandler}=require('../middlewares/validator.handler');
const chatService=new ChatService();
router.get('/',
    passport.authenticate('jwt',{session:false}),
    async (req,res,next)=>{
        await  chatService.listAllChats()
                .then(response=>{
                    res.status(200).json(response);
                })
                .catch(err=>next(err));
    }
);
router.post('/',
    ValidatorSchemaHandler(createChatSchema,'body'),
    async (req,res,next)=>{
        await chatService.createChat(req.body)
            .then(response=>{
                res.status(201).json(response);
            })
            .catch(err=>next(err));
    }
)
router.get('/my-chats',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
      await chatService.getLastMessageByAllChats(req.user.sub)
        .then(response => {
          res.status(200).json(response);
        })
        .catch(err => next(err));
});
router.get('/chat-messages',
    passport.authenticate('jwt', { session: false }),
    async (req,res,next)=>{
        await chatService.listMessagesByChat(req.query)
        .then((messages)=>{
            res.status(200).json(messages)
        })
        .catch(err=>next(err));
    }
)
module.exports=router;