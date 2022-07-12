const {model,Schema}=require('mongoose');

const UserSchema= new Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    avatar:{
        type:String,
        default: ""
    },
    role:{
        type: String,
        required:true,
        default: "user"
    }


})

module.exports=model('User',UserSchema);
