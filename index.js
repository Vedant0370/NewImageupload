// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const cors = require("cors");


// const app = express();
// const port = process.env.PORT || 9000;

// // Middleware to parse JSON request bodies
// app.use(bodyParser.json({ limit: "10mb" }));
// app.use(cors());



// mongoose.connect('mongodb://127.0.0.1:27017/your_database', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


// const servicesRouter = require("./src/routes/Imageroute");
// app.use("/api/images", servicesRouter);



// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


// server/index.js

// ... (your existing code)

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 9000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/your_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define storage for multer
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Serve static files from public directory
app.use('/public', express.static('public'));

// POST route for uploading images
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    const publicUrl = `https://yourdomain.com/public/uploads/${req.file.originalname}`;
    res.json({ imageUrl: publicUrl });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

const servicesRouter = require('./src/routes/Imageroute');
app.use('/api/images', servicesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
