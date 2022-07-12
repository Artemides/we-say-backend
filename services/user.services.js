const model=require('../db/models/users.models');
const boom=require('@hapi/boom');
const bcrypt=require('bcrypt');
class UserService{

    create(data){
        return new Promise(async(resolve,reject)=>{
            await model.create({
                ...data,
                password: await bcrypt.hash(data.password,10),
            })
                .then(user=>resolve(user))
                .catch(err=>reject(err));
        })
    }
    listAllUsers(){
        return new Promise(async(resolve,reject)=>{
            await model.find()
                .then(users=>resolve(users))
                .catch(err=>reject(err));
        })
    }
    findByEmail(email){
        return new Promise(async(resolve,reject)=>{
            const user=await model.findOne({email})
                        .catch(err=>reject(err));
            if(!user){
                reject(boom.notFound('User not found'));
            }
            resolve(user);
        })
    }
}
module.exports=UserService;