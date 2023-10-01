const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
// const multer = require('multer'); // Import multer

const app = express();
const port = process.env.PORT || 9000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());



mongoose.connect('mongodb://127.0.0.1:27017/your_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const servicesRouter = require("./src/routes/Imageroute");
app.use("/api/images", servicesRouter);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
