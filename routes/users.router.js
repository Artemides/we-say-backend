const express=require('express');
const {createUserSchema,getUserSchema}=require('../Schemas/user.schema');
const {ValidatorSchemaHandler}=require('../middlewares/validator.handler' );
const {uploadToGCS} = require('../middlewares/uploadGCS.handler');
const UserService=require('../services/user.services');
const passport = require('passport');
const router=express.Router();
const userService=new UserService();
const Multer = require('multer');
const multer=Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // le than 2MB
    }
})
router.get('/',
    passport.authenticate('jwt',{session:false}),
    ValidatorSchemaHandler(getUserSchema,'body'),
    async (req,res,next)=>{
        await userService.listUnknownUsers(req.user.sub,req.body)
              .then(users=>{
                res.status(200).json(users);
              })
              .catch(err=>next(err));
    }
);
router.post('/my-user',
    passport.authenticate('jwt',{session:false}),
    async (req,res,next)=>{
        await userService.getCurrentUser(req.user.sub)
        .then(user=>{
            res.status(200).json(user);
        })
        .catch(err=>next(err));
    }
)
router.post('/',
   ValidatorSchemaHandler(createUserSchema,'body'),
   async (req,res,next)=>{
        await userService.create(req.body)
            .then(user=>{
                res.status(201).json(user);
            })
            .catch(err=>next(err));
        }
);
router.patch('/avatar',
   passport.authenticate('jwt',{session:false}),
   multer.single('profile-image'),
   uploadToGCS,
   async(req,res,next)=>{
        await userService.updateUser(req.user.sub,req.file.gcsUrl)
            .then((user)=>{
                res.status(200).json({message: "updated"});
            })
            .catch(err=>next(err));
   }
)
module.exports=router;