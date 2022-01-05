const mongoose = require('mongoose')
const articles = require('./routes/articles')
const podcasts = require('./routes/podcasts')
const writers = require('./routes/writers')
const cors = require('cors')
const express = require('express')
const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}))
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
