const { Types } = require('mongoose');
const model = require('../db/models/chat.models');
const messageModel=require('../db/models/messages.models');

class ChatService {
  createChat(userId,otherUserId) {
    return new Promise(async (resolve, reject) => {
      const currentChat= await this.findChatWhith(userId,otherUserId).catch(err=>{reject(err)});
      if(currentChat){
        resolve(currentChat);
      }
      //CREATE DEFAULT MESSAGES
      const defaultMessage={
        user: userId,
        text:'Welcome,Say hello to your new friend',
      }
      const message= await messageModel.create(defaultMessage).catch(err=>{reject(err)});
      //CREATE NEW CHAT
      const data={
        users:[userId,otherUserId],
        messages:[message._id],
      }
      const newChat = new model(data);  
      const response=await model
        .create(newChat)
        .catch((err) => reject(err));
      resolve(response);
    });
  }
  findChatWhith(userId,otherUserId) {
    return new Promise(async (resolve, reject) => {
      await model
        .findOne({
          users: { $all: [userId, otherUserId] },
        })
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }
  findChatById(id) {
    return new Promise(async (resolve, reject) => {
      await model
        .findById(id)
        .then((response) => resolve(response))
        .catch((err) => reject(boom.notFound('Chat not found')));
    });
  }
  updateChat(id, changes) {
    return new Promise(async (resolve, reject) => {
      const chat = await model
        .findById(id)
        .catch((err) => reject(bom.notFound('Chat not found')));
      chat.messages.push(changes);
      await chat
        .save()
        .then((update) => {
          resolve(update);
        })
        .catch((err) => reject(err));
    });
  }
  listMessagesByChat(query){
    const {chatId}=query;
    return new Promise(async(resolve,reject)=>{
      await model
        .findById(chatId)
        .populate('messages')
        .exec((err,populated)=>{
          if(err) reject(err);
          resolve(populated);
        })
    })
  }
  listChatsByUser(userId) {
    return new Promise(async (resolve, reject) => {
      await model
        .find({
          users: userId,
        })
        .populate('users')
        .exec((err, populated) => {
          if (err) reject(err);
          resolve(populated);
        });
    });
  }
  listAllChats() {
    return new Promise(async (resolve, reject) => {
      await model
        .find()
        .populate('users')
        .exec((err, populated) => {
          if (err) reject(err);
          resolve(populated);
        });
    });
  }
  getLastMessageByAllChats(id) {
    return new Promise(async (resolve, reject) => {
      await model
        .aggregate([
          {
            $match: { users: Types.ObjectId(id) },
          },
          {
            $lookup: {
              from: 'messages',
              localField: 'messages',
              foreignField: '_id',
              pipeline: [
                {
                  $sort: { createdAt: -1 },
                },
                {
                  $limit: 1,
                },
              ],
              as: 'messages',
            },
          },
          {
            $unwind: '$messages',
          },
          {
            $lookup: {
              from: 'users',
              localField: 'users',
              foreignField: '_id',
              as: 'users',
              pipeline: [
                {
                  $match: {
                    _id: {
                        $nin:[Types.ObjectId(id)]
                    },
                  },
                },
                {
                  $project: {
                    password: 0,
                  },
                },
              ],
            },
          },
          {
            $unwind: '$users',
          }
        ])
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }
}
module.exports = ChatService;
