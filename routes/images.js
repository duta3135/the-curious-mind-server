const router = require('express').Router()
const fs = require('fs')
const cloudinary = require("cloudinary")
cloudinary.config({ 
    cloud_name: 'duta3135', 
    api_key: '647422818976769', 
    api_secret: 'uwLB4tNkEbq_wkdY08jbV7xkhjQ' 
  });
router.post('/', (req, res) => {
    if(!req.files){
        return res.status(400).json({message: 'no files'})
    }
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
    cloudinary.v2.uploader.upload(uploadPath, {exif: true, public_id: `${file.name}${id}`}, function(err, response){
        if(err) res.send(err)
        res.send(response)
        fs.unlinkSync(uploadPath)
    });
})
module.exports = router
