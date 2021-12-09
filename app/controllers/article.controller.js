const db = require('../models/index')
const Article = db.articles
exports.findAll = (req, res)=>{
    Article.find()
    .then(result=>{
        res.send(result)
    })
    .catch((err)=>{
        res.status(500).send({
            message: err.message || "failed to find all articles"
        })
    })
}