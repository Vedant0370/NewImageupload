


const mongoose = require("mongoose")

const ImageSchema = new mongoose.Schema({

    image : String
})

const newImageSchema = mongoose.model('images' , ImageSchema)

module.exports = newImageSchema