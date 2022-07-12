const {Strategy}=require('passport-local');
const AuthService=require('../../../services/auth.services');
const authService=new AuthService();
const LocalStrategy= new Strategy(
    {
    usernameField: 'email',
    passwordField: 'password',
    },
    async (email,password,done)=>{
        try {
            const user=await authService.login(email,password);
            done(null,user);
        } catch (error) {
            done(error,false);
        }
    }
);
module.exports=LocalStrategy;