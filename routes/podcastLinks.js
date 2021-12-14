const PodcastLink = require('../models/PodcastLink')
const mongoose = require('mongoose')
const Article = require('../models/Article')
const router = require('express').Router()
//posting a podcast link    
router.post('/', async (req, res)=>{
    try {
        const podcastLink = new PodcastLink({
            _id: new mongoose.Types.ObjectId(),
            cover:req.body.cover,
            title: req.body.title,
            link: req.body.link
        })
        podcastLink.save().then(
            ()=>{
                res.status(200).json({
                    message: `posted a podcast link, with id: ${podcastLink._id}`
                })
            }
        )
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
})
router.get('/', async (req, res)=>{
    try {
        const podcastLinks = await PodcastLink.find()
        res.send(podcastLinks)
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
})
module.exports = router