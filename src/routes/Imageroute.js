

const express = require('express')
const router = express.Router()

const newImageSchema = require('../models/ImageModels')

router.get('/' , async(req, res) => {

    try{
        const imagedata = await newImageSchema.find()
        res.json(imagedata)
    }catch(e){
        res.status(404).json({message : "Internal server error "})
    }
})

router.post('/' , async(req, res) => {

    try{
        const imagedata = new newImageSchema(req.body)
        await imagedata.save()
        res.status(201).json(imagedata)
    }catch(e){
        res.status(404).json({message : "internal server error"})
    }
})

router.patch("/:id" , async(req, res) => {

    const imageId = req.params.id

    try{
            const imagedata = await newImageSchema.findByIdAndUpdate(imageId , req.body , {
                new : true
            })
            res.json(imagedata)
    }catch(e){

        res.status(404).json({message : "internal server Error"})
    }
})

module.exports = router