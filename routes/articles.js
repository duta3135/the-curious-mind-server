const Article = require('../models/Article')
const mongoose = require('mongoose')
const router = require('express').Router()
router.post('/', (req,res)=>{
    const article = new Article({
    _id: new mongoose.Types.ObjectId(),
    title: "article",
    writer: "duta",
    description: "an article",
    category: "politics",
    content: "the quick brown fox jumps over the lazy dog",
    published: true
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
