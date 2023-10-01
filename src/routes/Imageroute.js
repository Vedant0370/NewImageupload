const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const newImageSchema = require('../models/ImageModels');

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (req.file) {
      const publicUrl = `http://localhost:9000/public/uploads/${req.file.originalname}`;

      const imageData = new newImageSchema({
        filename: req.file.originalname,
        path: req.file.path,
        imageUrl: publicUrl // Save the URL to the database
      });

      await imageData.save();
      res.status(201).json(imageData);
    } else {
      res.status(400).json({ error: 'No file uploaded' });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get('/', async (req, res) => {
    try {
      const imageData = await newImageSchema.find({}, '-_id filename imageUrl');
      res.json(imageData);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

module.exports = router;
