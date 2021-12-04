const express = require('express');
// const Post = require('../models/Post')
const router = express.Router();
//get all posts
router.get('/', (req,res) => {
    res.send('articles')
})
// get specific post
// router.get('/:postId', async (req, res) => {
//     try{const post = await Post.findById(req.params.postId)
//     res.json(post)}
//     catch(err){
//         res.json({message: err})
//     }
// })
// //update post
// router.patch('/:postId', async(req, res)=>{
//     try{
//         const updatePost = await Post.updateOne(
//             {_id: req.params.postId}, 
//             {$set: {
//                 title: req.body.title,
//                 name: req.body.name,
//                 content: req.body.name
//             }})
//         res.json(updatePost)
//     }
//     catch(err){
//         res.json({message: err})
//     }
// })
// //delete post
// router.delete('/:postId', async (req, res) => {
//     try{
//         const removePost = await Post.remove({_id: req.params.postId})
//         res.json(removePost)
//     }
//     catch(err){
//         res.json({message: err})
//     }
// })
// //create post
// router.post('/', (req, res)=>{
//     const post = new Post({
//         title: req.body.title,
//         name: req.body.name,
//         content: req.body.content
//     });
//     post.save()
//     .then(data => {
//         res.json(data)
//     })
//     .catch(err => {
//         res.json({message: err})
//     })
// })
module.exports = router;