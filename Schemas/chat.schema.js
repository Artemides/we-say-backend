const Joi=require('joi');
Joi.uuid=require('joi-objectid')(Joi);

const otherUserId= Joi.uuid();
const createChatSchema=Joi.object({
    otherUserId:otherUserId.required()
});
 
module.exports={
    createChatSchema
}