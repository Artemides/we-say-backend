const model = require('../db/models/users.models');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { Types } = require('mongoose');
const ChatService=require('../services/chat.services');

const chatService=new ChatService();
class UserService {
  create(data) {
    return new Promise(async (resolve, reject) => {
      await model
        .create({
          ...data,
          password: await bcrypt.hash(data.password, 10),
        })
        .then((user) => {
          user.password = undefined;
          resolve(user);
        })
        .catch((err) => reject(err));
    });
  }
  listUnknownUsers(id,body) {
    return new Promise(async (resolve, reject) => {
        const currentChats=await chatService.listChatsByUser(id);
        console.log(currentChats);
        const knownUsers=currentChats.reduce((acc,chat)=>{
            chat.users.forEach(user=>{
                console.log(typeof user._id);
                if(user._id!=id){
                    acc.push(Types.ObjectId(user._id));
                }
            }
            );
            return acc;
        },[]);
        knownUsers.push(Types.ObjectId(id));
        await model
        .find({
          _id:{$nin:knownUsers}
        })
        .then((users) => {
          users.forEach((user) => (user.password = undefined));
          resolve(users);
        })
        .catch((err) => reject(err));
    });
  }

  getCurrentUser(id) {
    return new Promise(async (resolve, reject) => {
      await model
        .findById(id)
        .then((user) => {
          user.password = undefined;
          resolve(user);
        })
        .catch((err) => reject(err));
    });
  }
  updateUser(id, changes) {
    return new Promise(async (resolve, reject) => {
      let user = await model.findById(id).catch((err) => reject(err));
      if (!user) {
        reject(boom.notFound('User not found'));
      }
      user.avatar = changes.avatar;
      user.once = false;
      const newUser = await user.save().catch((err) => reject(err));
      resolve({
        name: newUser.name,
        email: newUser.email,
        id: newUser._id,
        avatar: newUser.avatar,
      });
    });
  }
  findByEmail(email) {
    return new Promise(async (resolve, reject) => {
      let user = await model.findOne({ email }).catch((err) => reject(err));
      if (!user) {
        reject(boom.notFound('User not found'));
      }
      resolve(user);
    });
  }
}
module.exports = UserService;
