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
    console.log(err);
    if(err.isBoom){
        const {output}=err;
        res.status(output.statusCode).json(output.payload);
    }
    else{
        next(err);
    }
}
module.exports={
    logEror,
    handlerError,
    boomErrorHandler
}