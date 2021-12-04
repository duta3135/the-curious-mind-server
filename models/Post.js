const mongoose = require('mongoose')
const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    
    name: {
        type:String,
        required: true
    },
    
    content:{
        type: String,
        required: false,
        maxLength: 150
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Posts', PostSchema)