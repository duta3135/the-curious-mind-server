import mongoose from 'mongoose';
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