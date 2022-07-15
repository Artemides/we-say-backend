const express= require('express');
const routerApp=require('./routes');//importing Routes
const socket=require('./server/socket');//socket settings
const cors=require('cors');//importing cors
const db=require('./db');//db settings
const {
    boomErrorHandler,
    logEror,handlerError,
    mongooseErrorHandler
}=require('./middlewares/error.handler'); // Error Handlers
const port= process.env.PORT || 4000;
//Configure server
const app= express();
const server=require('http').createServer(app);
//Configure express
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
//exectute strategies
require('./utils/auth');
// Loading routes
routerApp(app);
// Middlewares sources
app.use(logEror);
app.use(boomErrorHandler);
app.use(mongooseErrorHandler);
app.use(handlerError);
//Launch server
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
//Launch socket
socket.connect(server);
//Launch db
db();