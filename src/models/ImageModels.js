


const mongoose = require("mongoose")

const ImageSchema = new mongoose.Schema({
    filename: String,
    path: String,
    imageUrl: String,
    servicename: String,               // Add this line
    servicesdescription: String       // Add this line
})

const newImageSchema = mongoose.model('images' , ImageSchema)

module.exports = newImageSchema;
