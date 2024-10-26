const express = require("express");
const multer = require("multer");
const path = require("path");
const controller=require("../controllers/blog.controller")
const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save images in 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
  },
});

// Initialize multer with the storage settings
const upload = multer({ storage: storage });
router.post("/",upload.single("image"),controller.store)
router.get("/",controller.index)
router.get("/:id",controller.get)
router.delete("/:id",controller.destroy)
router.put("/:id",controller.update)

module.exports=router;



