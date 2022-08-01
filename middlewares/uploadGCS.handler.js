const {Storage}=require('@google-cloud/storage');
const {config}=require('../config/config');
const boom =require('@hapi/boom');
const storage= new Storage({
    projectId:config.gcsProjectId,
    keyFilename:config.gcsCredentials
})
function uploadToGCS(req,res,next){
    if(!req.file){
        return next(boom.badRequest('No files were uploaded'));
    }
    const bucket=storage.bucket(config.gcsBucketName);
    const gcsFilename=`${Date.now()}-${req.file.originalname}`;
    const file=bucket.file(gcsFilename);
    const stream=file.createWriteStream({
        metadata:{
            contentType:req.file.mimetype
        }
    });
    stream.on('error',(err)=>{
        req.file.cloudStorageError=err;
        return next(err);
    })
    //finish file
    stream.on('finish',()=>{
        req.file.cloudStorageObject=gcsFilename;
        return file.makePublic()
        .then(()=>{
            req.file.gcsUrl=`https://storage.googleapis.com/${bucket.name}/${gcsFilename}`;
            return next();
        });
    });
    stream.end(req.file.buffer);
}
module.exports={uploadToGCS}
