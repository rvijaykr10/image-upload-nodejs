const express = require("express");
const router = express.Router();

const multer = require("multer");

const Gallery = require("../models/Gallery");

//MULTER SETUP
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    let filetype = " ";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    if (file.mimetype === "image/jpg") {
      filetype = "jpg";
    }
    cb(null, "image-" + Date.now() + "." + filetype);
  },
});
let upload = multer({ storage: storage });

//POST
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(500).json({ msg: "Upload Failed" });
    }
    const post = new Gallery({
      imgUrl:
        req.protocol + "://" + req.get("host") + "/images/" + req.file.filename,
    });

    const uploaded_post = await post.save();
    console.log(uploaded_post);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
});

module.exports = router;
