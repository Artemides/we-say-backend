const UserService=require('./user.services');
const boom=require('@hapi/boom');
const userService=new UserService();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {config}=require('../config/config');

class AuthService{

    async login(email,password){
        const user=await userService.findByEmail(email)
                        .catch(err=>{throw err});
        if(!user){
            throw boom.unauthorized('User not found');
        }
        if(!await bcrypt.compare(password,user.password)){
            throw boom.unauthorized('Wrong password');
        }
        return user;
    }
    signToken(user){
        const payload={
            sub: user._id,
            role: user.role,
            once: user.once
        };
        
        return {
            user,
            token: jwt.sign(payload,config.jwtSecret)
        }
    }
}
module.exports=AuthService;