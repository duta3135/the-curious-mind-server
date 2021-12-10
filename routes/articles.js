const Article = require('../models/Article')
const mongoose = require('mongoose')
const router = require('express').Router()
router.post('/', (req,res)=>{
    const {title, writer, description, category, content, published}=req.body
    const article = new Article({
    _id: new mongoose.Types.ObjectId(),
    title: {title},
    writer: {writer},
    description: {description},
    category: {category},
    content: {content},
    published: {published}
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
