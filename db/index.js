const db=require('mongoose');
const {config}=require('../config/config');
db.Promise=global.Promise;
const url=`mongodb+srv://${config.dbUser}:${config.dbPassword}@cluster0.dve3q.mongodb.net/${config.dbName}`;

async function connect(){
    await db.connect(url,{
        useNewUrlParser:true,
    }).then(()=>{
        console.log("Database Connected");
    }).catch(err=>console.log(err));
}
module.exports=connect;