const Writer = require('../models/Writer')
const mongoose = require('mongoose')
const Article = require('../models/Article')
const router = require('express').Router()
//post a writer
router.post('/', async (req, res) => {
    try {
        const writer = new Writer({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            name: req.body.name,
            password: req.body.password,
            insta: req.body.insta
        })
        writer.save().then(() => {
            res.status(200).json({
                message: `added a writer with id: ${writer._id}`
            })
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
})
//get all writers
router.get('/', async (req, res) => {
    try {
        const writers = await Writer.find()
        res.send(writers)

    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
})
//get a single writer
router.get('/:writerId', async (req, res) => {
    try {
        const writer = await Writer.findById(req.params.writerId)
        res.send(writer)
    }
    catch (err) {
        res.status(500).json({
            message: err
        })
    }
})
//remove a writer

module.exports = router