const express=require('express');
const router=express.Router();
const AuthService=require('../services/auth.services');
const authService=new AuthService();
const {loginSchema}=require('../Schemas/user.schema');
const {ValidatorSchemaHandler}=require('../middlewares/validator.handler');
const passport=require('passport');
router.post('/login',
    ValidatorSchemaHandler(loginSchema,'body'),
    passport.authenticate('local',{session:false}),
    (req,res,next)=>{
        try {
            res.status(200).json(authService.signToken(req.user));
        } catch (error) {
            next(error);
        }
    }
);
module.exports=router;