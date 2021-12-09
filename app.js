const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.get('/', (req,res)=>{
    res.send("you're on home")
})
const PORT = 3001
app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})