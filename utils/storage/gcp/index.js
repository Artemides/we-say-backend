const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');
const boom =require('@hapi/boom');
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, //
  },
});

const projectId = '';
const keyFilename = '';

const storage = new Storage({
  projectId,
  keyFilename,
});

const bucket = storage.bucket('');

function uploadToGCS(file) {
  try {
    const blob = bucket.file(file.filename);
    const blobStream = blob.createWriteStream();
    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      console.log(publicUrl);
    });
    blobStream.end(file.buffer);
  } catch (error) {
    throw boom.conflict(error);
  }
}
