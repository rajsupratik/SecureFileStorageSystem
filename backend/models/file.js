const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  filename: { type: String, required: true },
  file_path: { type: String, required: true },
  upload_date: { type: Date, default: Date.now },
  access_level: { type: String, enum: ['public', 'private'], default: 'private' }
});

module.exports = mongoose.model('File', FileSchema);

