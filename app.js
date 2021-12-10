const Article = require('./models/Article.js')
const mongoose = require('mongoose')
mongoose.connect(
    'mongodb://localhost:27017/collect-tcm', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(()=>{
    console.log('connected to db')
}).catch(err=>{
    console.log(err)
})

const article = new Article({
    title: "article",
    writer: "duta",
    description: "an article",
    category: "politics",
    content: "the quick brown fox jumps over the lazy dog",
    published: true
})
article.save()  
    .then(()=>{
        console.log('posted article')       
    }) 
    .catch(err=>{
        console.log(err)
    })