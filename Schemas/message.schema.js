const joi=require('joi');
joi.objectId=require('joi-objectid')(joi);
const id=joi.objectId();
const text=joi.string().min(1);
const user=joi.string().min(2);
const chat=joi.objectId();
const sendMessageSchema=joi.object({
    chat:chat.required(),
    user:id.required(),
    text:text.required()
});
const updateMessageSchema=joi.object({
    text:text
})
const filterMessageSchema=joi.object({
    user:user
})
const idValidation=joi.object({
    id:id.required()
})
module.exports={
    sendMessageSchema,
    updateMessageSchema,
    filterMessageSchema,
    idValidation
}