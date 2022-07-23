require('dotenv').config();

const config={
    env: process.env.NOVE_ENV||'development',
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    jwtSecret: process.env.JWT_SECRET,
    gcsBucketName: process.env.GCS_BUCKET_NAME,
    gcsProjectId: process.env.GCS_PROJECT_ID,
}
module.exports={
    config
};