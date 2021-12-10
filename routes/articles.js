const Article = require('../models/Article')
const mongoose = require('mongoose')
const router = require('express').Router()
//post an article
router.post('/', (req,res)=>{
    const article = new Article({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    writer: req.body.writer,
    description: req.body.description,
    category: req.body.category,
    content: req.body.content,
    published: req.body.published,
    time: Date.now()
    })
    article.save()  
        .then(()=>{
            res.status(200).send('posted an article')       
        }) 
        .catch(err=>{
            res.status(500).json({
                message: err
            })
        })
    }
)
//get all articles
router.get('/', async (req, res)=>{
    try{
        const articles = await Article.find()
        res.send(articles)
    }
    catch(err){
        console.log(err)
    }
})
module.exports = router
