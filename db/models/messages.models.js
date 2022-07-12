const {model,Schema}=require('mongoose');

const MessageSchema= new Schema({
    chat:{
        type:Schema.ObjectId,
        required:true,
        ref: 'Chat'
    },
    user: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    message: {
        type: String,
        require: true
    },
    fileUrl: String
    },
    {
        timestamps: true
    }
)
module.exports= model('Message',MessageSchema);