module.exports = (app) =>{
    const articles = require('../controllers/article.controller')
    const router =require('express').Router()
    router.get('/', articles.findAll)
    app.use('/articles', router)
}