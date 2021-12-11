const Article = require('../models/Article')
const mongoose = require('mongoose')
const router = require('express').Router()
//post an article
router.post('/', async (req,res)=>{
    try{
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
                res.status(200).json({
                    message: 'posted an article'
                })       
        }) 
    }
    catch(err){
        res.status(500).json({
            message: err
        })
    }
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
//get an article
router.get('/:postId', async (req, res)=>{
    try{
        const anArticle = await Article.findById(req.params.postId)
        res.send(anArticle)
    }
    catch(err){
        res.json('failed to get an article')
    }
})
//delete single article
router.delete('/:postId', async (req,res)=>{
    try{
        await Article.deleteOne({_id: req.params.postId})
        res.json({
            message: `deleted ${req.params.postId}`
        })
    }
    catch(err){
        res.json(err)
    }
})
//update an article
router.patch('/:postId', async (req, res)=>{
    try{
        Article.findByIdAndUpdate(req.params.postId, {
            title: req.body.title,
            writer: req.body.writer,
            description: req.body.description,
            category: req.body.category,
            content: req.body.content,
            published: req.body.published
        })
        res.json({
            message: `updated ${req.params.postId}`
        })
    }
    catch(err){
        console.log(err)
    }
})
module.exports = router
