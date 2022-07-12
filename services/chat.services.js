const model=require('../db/models/chat.models');

class ChatService{

    createChat(data){
        return new Promise(async (resolve,reject)=>{
            const newChat=new model(data);
            await model.create(newChat)
                    .then(response=>{
                        resolve(response)
                    })
                    .catch(err=>reject(err));
        })
    }
    listChatsByUser(userId){
        return new Promise(async(resolve,reject)=>{        
            await model.find({
                users:userId
            })
            .populate('users')
            .exec((err,populated)=>{
                if(err) reject(err);
                resolve(populated);
            })
        })
    }
    listAllChats(){
        return new Promise(async(resolve,reject)=>{
            await model.find()
                .populate('users')
                .exec((err,populated)=>{
                    if(err) reject(err);
                    resolve(populated);
                })
        })
    }
};
module.exports=ChatService;