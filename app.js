const mongoose = require('mongoose')
const articlesRoute = require('./routes/articles')
const express = require('express')
const app = express()
app.use(express.json())
//connect to mongodb
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
//connect to server
app.listen(3001, ()=>{console.log('server running on http://localhost:3001')})
//routes
app.use('/articles', articlesRoute)
