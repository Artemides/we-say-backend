const {model,Schema}=require('mongoose');

const ChatSchema= new Schema({
    users:[{
        type:Schema.ObjectId,
        ref:'User'
    }]
},{
    timestamps: true
})

module.exports= model('Chat',ChatSchema);