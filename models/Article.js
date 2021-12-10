const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    title: String,
    writer: String,
    description: String,
    category: String,
    content: String,
    published: Boolean
})

module.exports=mongoose.model("Article", schema)