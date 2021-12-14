const mongoose = require('mongoose')
const schema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: {
        type: String,
        required: [true, 'title empty, please fill out']
    },
    cover: {
        type: String,
        required: false         
    },
    link: {
        type: String,
        required: [true, 'link empty, please fill out']
    }
})
module.exports = mongoose.model("PodcastLink", schema)