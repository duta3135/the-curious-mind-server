const Article = require('../models/Article')
const mongoose = require('mongoose')
const router = require('express').Router()
router.post('/', (req,res)=>{
    const article = new Article({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    writer: req.body.writer,
    description: req.body.description,
    category: req.body.category,
    content: req.body.content,
    published: req.body.published
})
article.save()  
    .then(()=>{
        res.status(200).send('posted article')       
    }) 
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
})
module.exports = router
