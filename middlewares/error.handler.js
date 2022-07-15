function logEror(err, req, res, next) {
    console.log("LOG ERROR");
    console.error(err);
    next(err);
}
function handlerError(err,req,res,next){
    res.status(500).json({
        "message":err.message,
        err
    })
}
function boomErrorHandler(err,req,res,next){
    if(err.isBoom){
        const {output}=err;
        res.status(output.statusCode).json(output.payload);
    }
    else{
        next(err);
    }
}
function mongooseErrorHandler(err,req,res,next){
    console.log("MONGOOSE ERROR");
    console.log(err);
    if(err.name==='MongoError'){
        console.log(err)
        res.status(400).json({
            "message":err.message,
            err
        })
    }
    else{
        next(err);
    }
}
module.exports={
    logEror,
    handlerError,
    boomErrorHandler,
    mongooseErrorHandler
}