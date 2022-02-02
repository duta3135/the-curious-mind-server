const router = require('express').Router()
const Writer = require('../models/Writer')
const mongoose = require('mongoose')
const {scryptSync, timingSafeEqual} = require('crypto')

router.post('/', async (req, res) => {
    Writer.findOne({username: req.body.username}).then((result)=>{
        const [salt, hash] = result.password.split(':')
        const hashedBuffer = scryptSync(req.body.password, salt, 64)
        const keyBuffer = Buffer.from(hash, 'hex')
        const match = timingSafeEqual(hashedBuffer, keyBuffer)
        res.status(200).json({isVerified: match})
        // res.send(result)
    })
    .catch((err)=>res.status(500).json({message:err}))
})
module.exports = router