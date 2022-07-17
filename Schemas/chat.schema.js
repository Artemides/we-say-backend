const Joi=require('joi');
Joi.uuid=require('joi-objectid')(Joi);

const users= Joi.array().items(Joi.uuid()).min(2);
const createChatSchema=Joi.object({
    users:users.required()
});
 
module.exports={
    createChatSchema
}