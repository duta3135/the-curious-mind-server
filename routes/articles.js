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
                    message: `posted an article with id: ${article._id}`,
                    id: article._id 
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
    if(!req.query.sample)
    try {
        const exclusion = req.query.exclude || 0
        await Article.aggregate().lookup({
            from: "writers",
            localField: 'writers',
            foreignField: 'name',
            as: 'writers'
        }).then(result=>res.send(result))
        // await Article.find().limit(Number(req.query.limit))
    } catch (err) {
        res.status(500).send(err)
    }
    else{
        await Article.aggregate().sample(1).then(result=>res.send(result))
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
            writers: req.body.writers,
            description: req.body.description,
            category: req.body.category,
            content: req.body.content,
            published: req.body.published
        }).then(res.json({
            message: `updated ${req.params.postId}`
        }))
        
    }
    catch(err){
        res.status(500).json({
            message:err
        })
    }
})

module.exports = router
