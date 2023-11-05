const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThumbnailJobSchema = new Schema({
  imagePath: String,
  thumbnailUrl: String,
  status: String,
});

module.exports = mongoose.model('ThumbnailJob', ThumbnailJobSchema);