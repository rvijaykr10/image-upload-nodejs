const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  imgUrl: String,
});

module.exports = mongoose.model("Gallery", GallerySchema);
