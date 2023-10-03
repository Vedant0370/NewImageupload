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

// router.post('/', upload.single('image'), async (req, res) => {
//   try {
//     if (req.file) {
//       const publicUrl = `https://imageupload-dfsr.onrender.com/public/uploads/${req.file.originalname}`;
       
//       const imageData = new newImageSchema({
//         filename: req.file.originalname,
//         path: req.file.path,
//         imageUrl: publicUrl // Save the URL to the database
//       });

//       await imageData.save();
//       res.status(201).json(imageData);
//     } else {
//       res.status(400).json({ error: 'No file uploaded' });
//     }
//   } catch (e) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (req.file) {
      const publicUrl = `https://imageupload-dfsr.onrender.com/public/uploads/${req.file.originalname}`;
       
      const imageData = new newImageSchema({
        filename: req.file.originalname,
        path: req.file.path,
        imageUrl: publicUrl,
        servicename: req.body.servicename,                 // Add this line
        servicesdescription: req.body.servicesdescription  // Add this line
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


  // for getting id with dataentry 
  router.get('/', async (req, res) => {
    try {
      const imageData = await newImageSchema.find({}, '-__v'); // Exclude the '__v' field
      res.json(imageData);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

// using this not getting id with each entry 
// router.get('/', async (req, res) => {
//     try {
//       const imageData = await newImageSchema.find({}, '-_id filename imageUrl');
//       res.json(imageData);
//     } catch (error) {
//       res.status(500).json({ message: "Internal server error" });
//     }
//   });

// this is code  for send only image url not file name and path 
// router.get('/', async (req, res) => {
//     try {
//       const imageData = await newImageSchema.find({}, '-__v -filename -path'); // Exclude '__v', 'filename', and 'path'
//       res.json(imageData);
//     } catch (error) {
//       res.status(500).json({ message: "Internal server error" });
//     }
//   });
  
  


module.exports = router;
