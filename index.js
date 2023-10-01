// index.js (or server.js)

const express = require('express');
const multer = require('multer');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 9000;

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

mongoose.connect('mongodb+srv://vedantassignment05:buBZNG020rQi97BY@uniqimage.s3onmvw.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/public', express.static('public'));
app.use(cors())
app.use(bodyParser.json());


const upload = multer({ storage: storage });

const ImageRoute = require('./src/routes/Imageroute');
// const { default: mongoose } = require('mongoose');

app.use('/api/images', ImageRoute);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});