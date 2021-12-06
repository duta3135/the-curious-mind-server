const mongoose = require('mongoose')
const ArticleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    
    writer: {
        type:String,
        required: true
    },
    description: {
        type:String,
        required: false,
        maxLength: 200
    },
    content:{
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Articles', ArticleSchema)