const mongoose = require('mongoose')
const Writer = require('./models/Writer')
const articles = require('./routes/articles')
const podcasts = require('./routes/podcasts')
const writers = require('./routes/writers')
const images = require('./routes/images')
const verify = require('./routes/verify')
const {timingSafeEqual} = require('crypto')

const fileUpload = require("express-fileupload")

const cors = require('cors')
const express = require('express')
const app = express()
const unsecuredWritersMethod = ['GET', 'POST']
function headerAuth(req,res,next){
    if(req.path==='/verify'|| req.path==='/images' || req.path==='/writers'){
        next()
    }
    else if (req.method==="GET"){
        next()
    }
    else{
        // console.log(req.headers.authorization)
        const [username, salt, key]=req.headers.authorization.split(":")
        Writer.findOne({username: username}).then(result=>{
            if(result){
                const match = result.password === `${salt}:${key}` 
                if(match){
                    next()
                }
                else{
                    res.status(401).json({message:"not authorized"})
                }
                // console.log("writer exists")
            }
            else{
                res.status(401).json({message:"not authorized"})
                // console.log("writer doesnt exists")
            }
        }
        ).catch(err=>res.status(500).json({message: err}))
    }}

app.all("*", headerAuth)
app.use(fileUpload())
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
app.use('/images', images)
app.use('/verify', verify)
