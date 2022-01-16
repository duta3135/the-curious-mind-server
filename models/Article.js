const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    _id: String,
    cover: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: [true, 'title empty, please fill in title']
    },
    writers: {
        type: Array,
        required: [true, 'writer empty, please fill in title']
    },
    description: {
        type: String,
        required: false,
        maxlength: [150, 'description too long']
    },
    category: {
        type: String,
        enum: {
            values: ['Entertainment', 'Health', 'Politics', 'Food'],
            message: 'category does not fulfill requirements'
        }
    },
    content: Object,
    published: {
        type: Boolean,
        required: [true, 'published property needed']
    }
})

module.exports=mongoose.model("Article", schema)