const model = require('../db/models/messages.models');
const boom = require('@hapi/boom');
const { socket } = require('../server/socket');
const ChatService=require('../services/chat.services');
const chatService=new ChatService();
class MessageService {
  sendMessage(data,userId) {
    return new Promise(async (resolve, reject) => {
      let {chat,to}=data;
      let newMessage = new model({
        text:data.text,
        user:data.user,
      });
      const response = await newMessage.save().catch(err=>reject(err));
      await chatService.updateChat(chat,response._id).catch(err=>reject(err));
      to=global.usersOnline.get(to);
      const from=global.usersOnline.get(userId);
      if(to || from){
        socket.io.to(from).to(to).emit('comming-messages', response);
      }
      resolve(response);
    })
   
  }
  async listAllMessages(query) {
    return new Promise((resolve, reject) => {
      const { user, chat } = query;
      const filter = {};
      if (user) {
        filter.user = user;
      }
      model
        .find(filter)
        .populate('user')
        .exec((err, populated) => {
          if (err) reject(err);
          resolve(populated);
        });
    });
  }
  async updateMessage(id, message) {
    const currentMessage = await model.findById(id);
    if (!currentMessage) {
      throw boom.notFound('Message not found');
    }
    currentMessage.text = message;
    const newMessage = await currentMessage.save();
    return newMessage;
  }
  deleteMessage(id) {
    return new Promise(async (resolve, reject) => {
      await model
        .deleteOne({
          _id: id,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  }
}
module.exports = MessageService;
