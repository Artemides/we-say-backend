const model = require('../db/models/messages.models');
const boom = require('@hapi/boom');
const {socket}=require('../server/socket');
class MessageService {
  async sendMessage(message,file) {
    let fileUrl="";
    if(file){
        fileUrl='http://localhost:4000/files'+file.filename;
    }
    let newMessage = new model(message);
    newMessage.fileUrl=fileUrl;
    const response = await newMessage.save();
    socket.io.emit('chat-message',response);
    return response;
  }
  async listAllMessages(query) {
    return new Promise((resolve, reject) => {
      const { user,chat } = query;
      const filter = {};
      if (user) {
        filter.user = user;
      }
      if(chat){
        filter.chat = chat;
      }
      model.find(filter)
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
    currentMessage.message = message;
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
