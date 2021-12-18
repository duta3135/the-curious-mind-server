const mongoose = require('mongoose')
const articles = require('./routes/articles')
const podcasts = require('./routes/podcasts')
const writers = require('./routes/writers')
require
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
app.use('/articles', articles)
app.use('/podcasts', podcasts)
app.use('/writers', writers)
