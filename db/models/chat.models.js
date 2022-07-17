const {model,Schema}=require('mongoose');

const ChatSchema= new Schema({
    users:[{
        type:Schema.ObjectId,
        ref:'User'
    }],
    messages:[{
        type:Schema.ObjectId,
        ref:'Message'
    }]
},{
    timestamps: true
})

module.exports= model('Chat',ChatSchema);