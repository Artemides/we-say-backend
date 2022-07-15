const Joi=require('joi');
Joi.uuid=require('joi-objectid')(Joi);

const id= Joi.uuid();
const name=Joi.string().min(2);
const password=Joi.string().min(8);
const email=Joi.string().email();
const avatar=Joi.string().min(2);

const idValidator=Joi.object({
    id:id.required()
})
const createUserSchema=Joi.object({
    name:name.required(),
    password: password.required(),
    email:email.required(),
})
const updateUserSchema=Joi.object({
    name,
    password,
    email
})
const loginSchema=Joi.object({
    email:email.required(),
    password:password.required()
})
const updateUserAvatarSchema=Joi.object({
    avatar:avatar.required()
})
module.exports={
    createUserSchema,
    updateUserSchema,
    idValidator,
    updateUserAvatarSchema,
    loginSchema
}