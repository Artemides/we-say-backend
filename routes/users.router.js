const express=require('express');
const {createUserSchema,idValidator}=require('../Schemas/user.schema');
const {ValidatorSchemaHandler}=require('../middlewares/validator.handler' );
const UserService=require('../services/user.services');
const router=express.Router();
const userService=new UserService();
router.get('/',
    async (req,res,next)=>{
        await userService.listAllUsers()
              .then(users=>{
                res.status(200).json(users);
              })
              .catch(err=>next(err));
    }
);
router.post('/',
   ValidatorSchemaHandler(createUserSchema,'body'),
   async (req,res,next)=>{
        await userService.create(req.body)
            .then(user=>{
                res.status(201).json(user);
            })
            .catch(err=>next(err));
        }
)
module.exports=router;