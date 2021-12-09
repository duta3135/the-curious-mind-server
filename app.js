const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const db = require('./app/models/')
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log('connected to db')
    })
    .catch((err)=>{
        console.log(err)
        process.exit()
    })
app.get('/', (req,res)=>{
    res.send("you're on home")
})
const PORT = 3001
app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})