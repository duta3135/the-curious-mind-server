require('dotenv').config();

const mongoose = require('mongoose')
const articles = require('./routes/articles')
const podcasts = require('./routes/podcasts')
const writers = require('./routes/writers')
const images = require('./routes/images')
const verify = require('./routes/verify')

const fileUpload = require("express-fileupload")

const cors = require('cors')
const express = require('express')
const app = express()
app.use(fileUpload())
app.use(express.json())
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))
//connect to mongodb
mongoose.connect(
    process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(()=>{
    console.log('connected to db')
}).catch(err=>{
    console.log(err)
})
//connect to server
app.listen(process.env.PORT, ()=>{console.log('server running')})
//routes
app.use('/articles', articles)
app.use('/podcasts', podcasts)
app.use('/writers', writers)
app.use('/images', images)
app.use('/verify', verify)
