const path = require('path');

const Storage = require('@google-cloud/storage');
const CLOUD_BUCKET = process.env.CLOUD_BUCKET;
const storage = Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET);
const getPublicUrl = filename => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}
const sendUploadToGCS = (req, res, next) => {
  if (!req.file)
    return next();
  // Rename uploaded filename
  const gcsname = Date.now() + '-' + req.file.originalname;

  // Create file object
  const file = bucket.file(gcsname);
  // Write stream to file
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  // Handling error on stream
  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  })

  // Handling finish on stream
  stream.on('finish', () => {
    console.log('WAS HERE');
    req.file.cloudStorageObject = gcsname;
    // Make file Public
    file.makePublic().then((response) => {
      req.file.apiResponse = response[0];
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    })
  })

  stream.end(req.file.buffer);
}

const Multer = require('multer'),
  multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 5 * 1024 * 1024
    },
    fileFilter: function (req, file, cb) {
      var filetypes = /jpeg|jpg|png/;
      var mimetype = filetypes.test(file.mimetype);
      var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

      if (mimetype && extname) {
        return cb(null, true);
      }

      cb("Error: File type not supported");
    }
  })

module.exports = {
  multer,
  sendUploadToGCS
};
