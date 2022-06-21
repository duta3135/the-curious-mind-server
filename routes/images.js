require('dotenv').config();
const cloudinary = require("cloudinary");
cloudinary.config({ 
    cloud_name: 'duta3135', 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });
const path = require('path')
const DataURIParser = require('datauri/parser')
const router = require('express').Router()
const datauri = new DataURIParser()
router.post('/',async (req, res) => {
    if(!req.files){
        return res.status(400).json({message: 'no files'})
    }
    try{
        const image = await datauri.format(path.extname(req.files.image.name).toString(), req.files.image.data).content
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        var id;
        for (var i = 0; i <= 4; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            var rawTxt;
            rawTxt += chars.substring(randomNumber, randomNumber +1);
            id = rawTxt.replace('undefined', '')
           }
         
        cloudinary.v2.uploader.upload(
            image, 
            {exif: true, public_id: `images/${req.files.image.name}${id}`}, 
            function(err, response){
                if(err) res.send(err)
                res.status(200).json({
                    message: response,
                    id: `${req.files.image.name}${id}`
                })
        });
    }
    catch(err){
        res.status(500).json({message: err})
    }
})
router.delete('/:imageId', (req, res) => {
    cloudinary.v2.uploader.destroy(
        req.params.imageId, 
        {invalidate: true}, 
        function(err, response){
            if(err) res.send(err)
            res.status(200).send(response)
    })
})
module.exports = router
