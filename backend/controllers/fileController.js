const File = require('../models/file');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.uploadFile = (req, res) => {
  const { file } = req;
  const { user_id } = req.body;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${Date.now()}_${file.originalname}`,
    Body: fs.createReadStream(file.path),
    ContentType: file.mimetype
  };

  s3.upload(params, async (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    const newFile = new File({
      user_id,
      filename: file.originalname,
      file_path: data.Location
    });
    await newFile.save();
    res.status(201).send('File uploaded');
  });
};
