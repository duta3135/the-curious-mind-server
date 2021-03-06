require('dotenv').config();
const router = require('express').Router()
const fs = require('fs')
const cloudinary = require("cloudinary")
cloudinary.config({ 
    cloud_name: 'duta3135', 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });
router.post('/', (req, res) => {
    if(!req.files){
        return res.status(400).json({message: 'no files'})
    }
    try{
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        var id;
        for (var i = 0; i <= 4; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            var rawTxt;
            rawTxt += chars.substring(randomNumber, randomNumber +1);
            id = rawTxt.replace('undefined', '')
           }
         
        // console.log(req.files)
        const file= req.files.image
        const uploadPath= `${__dirname}/../uploads/${file.name}`
        file.mv(uploadPath, function(err){
            if (err){
                return res.status(500).send(err)
            }
        })
        cloudinary.v2.uploader.upload(
            uploadPath, 
            {exif: true, public_id: `images/${file.name}${id}`}, 
            function(err, response){
                if(err) res.send(err)
                res.status(200).json({
                    message: response,
                    id: `${file.name}${id}`
                })
                fs.unlinkSync(uploadPath)
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
