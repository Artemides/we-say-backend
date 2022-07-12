const joi=require('joi');
joi.objectId=require('joi-objectid')(joi);
const id=joi.objectId();
const message=joi.string().min(1);
const user=joi.string().min(2);

const sendMessageSchema=joi.object({
    chat: id.required(),
    user:id.required(),
    message:message.required()
});
const updateMessageSchema=joi.object({
    message:message
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