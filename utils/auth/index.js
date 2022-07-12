const  passport=require('passport');
const LocalStrategy=require('./strategies/local.strategy');
passport.use('local',LocalStrategy);