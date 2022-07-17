const {model,Schema}=require('mongoose');

const MessageSchema= new Schema({
    user: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
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