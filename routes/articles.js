const express = require('express');
const Article = require('../models/Article')
const router = express.Router();
const mongoose = require('mongoose')
router.get('/', (req,res) => {
    res.send('articles')
})
//posting an article
router.post('/', (req, res)=>{
    const article = new Article({
        _id:new mongoose.Types.ObjectId(),
        title: req.body.title,
        writer: req.body.writer,
        description: req.body.description,
        content: req.body.content,
        date: Date.now
    })
    article.save()
    .then(
        res.status(200).json({
            message: "posted an article"
        })
    )
    .catch(
        res.status(500).json({
            message: 'failed to post an article'
        })
    )
})
module.exports = router;