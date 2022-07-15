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
                .then(user=>{
                    user.password=undefined;
                    resolve(user);
                })
                .catch(err=>reject(err));
        })
    }
    listAllUsers(){
        return new Promise(async(resolve,reject)=>{
            await model.find()
                .then(users=>{
                    users.forEach(user=>user.password=undefined);
                    resolve(users);
                })
                .catch(err=>reject(err));
        }) 
    }
    getCurrentUser(id){
        return new Promise(async(resolve,reject)=>{
            await model.findById(id)
            .then(user=>{
                user.password=undefined;
                resolve(user)
            })
            .catch(err=>reject(err));
        });
    }
    updateUser(id,changes){
        return new Promise(async(resolve,reject)=>{
            let user =await model.findById(id)
            .catch(err=>reject(err));
            if(!user){
                reject(boom.notFound('User not found'));
            }
            user.avatar=changes.avatar;
            user.once=false;
            const newUser=await user.save()
            .catch(err=>reject(err));
            resolve({
                name: newUser.name,
                email: newUser.email,
                id: newUser._id,
                avatar: newUser.avatar
            });
        })
    }
    findByEmail(email){
        return new Promise(async(resolve,reject)=>{
            let user=await model.findOne({email})
                        .catch(err=>reject(err));
            if(!user){
                reject(boom.notFound('User not found'));
            }
            resolve(user);
        })
    }
}
module.exports=UserService;