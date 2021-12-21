const Podcast = require('../models/Podcast')
const mongoose = require('mongoose')
const router = require('express').Router()
//posts a podcast link    
router.post('/', async (req, res)=>{
    try {
        const podcast = new Podcast({
            _id: new mongoose.Types.ObjectId(),
            cover:req.body.cover,
            title: req.body.title,
            link: req.body.link
        })
        podcast.save().then(
            ()=>{
                res.status(200).json({
                    message: `posted a podcast, with id: ${podcast._id}`
                })
            }
        )
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
})
//get all podcasts
router.get('/', async (req, res)=>{
    try {
        const podcasts = await Podcast.find()
        res.send(podcasts)
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
})
//gets a single podcast
router.get('/:podcastId', async (req,res)=>{
    try {
        const podcast = await Podcast.findById(req.params.podcastId)
        res.send(podcast)
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
})
//edits a podcast
router.patch('/:podcastId', async (req, res) => {
    try{
        Podcast.findByIdAndUpdate(req.params.podcastId, {
            cover:req.body.cover,
            title: req.body.title,
            link: req.body.link
        })
        res.json({
            message: `updated ${req.params.podcastId}`
        })
    }
    catch(err){
        res.status(500).json({
            message:err
        })
    }
})
//deletes a podcast
router.delete('/:podcastId', async (req, res)=>{
    try{
        await Podcast.findByIdAndDelete(req.params.podcastId)
        .then(() => {
            res.status(200).json({
                message: `deleted ${req.params.podcastId}`
            })
        })
    }
    catch(err){
        res.status(500).json({
            message: err
        })
    }
})
module.exports = router
