const Article = require('../models/Article')
const mongoose = require('mongoose')
const router = require('express').Router()
//post an article
router.post('/', async (req,res)=>{
    try{
        const article = new Article({
            _id: new mongoose.Types.ObjectId(),
            cover: req.body.cover,
            title: req.body.title,
            writers: req.body.writers,
            description: req.body.description,
            category: req.body.category,
            content: req.body.content,
            published: req.body.published,
            time: Date.now()
        })
        article.save()  
            .then(()=>{
                res.status(200).json({
                    message: `posted an article with id: ${article._id}`
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
    //get all published articles in a category(/articles)
    if(req.query.limit && req.query.category){
        try{
            const articles = await Article.find({category: req.query.category, published: true}).limit(Number(req.query.limit))
            res.send(articles)
            }
            catch(err){
                res.status(500).json({
                    message:err
                })
            }
    }
    //get all published articles, limited to a number(/)
    else if(req.query.limit){
        try{
            const articles = await Article.find({published: true}).limit(Number(req.query.limit))
            res.send(articles)
            }
            catch(err){
                res.status(500).json({
                    message:err
                })
            }
    }
    //get all published articles with a category and limited to a number(/articles/:id)
    else if(req.query.category){
        try{
        const articles = await Article.find({category: req.query.category, published:true})
        res.send(articles)
        }
        catch(err){
            res.status(500).json({
                message:err
            })
        }
    }
    //get all articles with the specified published
    else if(req.query.published){
        try {
            const articles = await Article.find({published: req.query.published})
            res.send(articles)
        } catch (err) {
            res.status(500).json({
                message:err
            })
        }
    }
    //get all articles
    else{
        try{
            const articles = await Article.find()
            res.send(articles)
            }
            catch(err){
                res.status(500).json({
                    message:err
                })
            }
    }
    
})

//get an article by id
router.get('/:postId', async (req, res)=>{
    try{
        const article = await Article.findById(req.params.postId)
        res.send(article)
    }
    catch(err){
        res.status(500).json({
            message:err
        })
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
        res.status(500).json({
                message:err
            })
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
        res.status(500).json({
            message:err
        })
    }
})

module.exports = router
