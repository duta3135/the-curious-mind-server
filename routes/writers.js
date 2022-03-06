const Writer = require('../models/Writer')
const mongoose = require('mongoose')
const authenticate = require('../middleware/authenticate')
const {scryptSync, randomBytes} = require('crypto')
const router = require('express').Router()
//post a writer
function hash(text){
    const salt = randomBytes(16).toString('hex')
    const hashedText = scryptSync(text, salt, 64).toString('hex')
    return `${salt}:${hashedText}`
}
router.post('/', async (req, res) => {
    try {
        const password = hash(req.body.password)
        const writer = new Writer({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            name: req.body.name,
            password: password,
            insta: req.body.insta
        })
        writer.save().then(() => {
            res.status(200).json({
                message: `added a writer with id: ${writer._id}`,
                token: `${writer.username}:${password}`
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
router.get('/:writerUsername', async (req, res) => {
    try {
        const writer = await Writer.find({username: req.params.writerUsername})
        res.send(writer)
    }
    catch (err) {
        res.status(500).json({
            message: err
        })
    }
})
//edit a writer
router.patch('/:writerUsername',authenticate, async (req, res) => {
    try{
        await Writer.findOneAndUpdate({username: req.params.writerUsername}, {
            username: req.body.username,
            name: req.body.name,
            password: req.body.password,
            insta: req.body.insta
        })
        res.status(200).json({
            message: `updated id: ${req.params.writerUsername}`
        })
    }
    catch(err){
        res.status(500).json({
            message: err
        })
    }
})
//remove a writer
router.delete('/:writerUsername',authenticate, async (req, res) => {
    try {
        await Writer.findOneAndRemove({username: req.params.writerUsername})
        .then(() => {
            res.status(200).json({
                message: `deleted ${req.params.writerUsername}`
            })
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
})
module.exports = router