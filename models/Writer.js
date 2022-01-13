const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username:{
        type: String,
        required: [true, 'username empty, please fill out'],
        unique: [true, "username already exists"]
    },
    name:{
        type:String,
        required: [true, 'name empty, please fill out']
    },
    password:{
        type: String,
        required: [true, 'password empty, please fill out']
    },
    insta:{
        type: String,
        required: false
    }
})
module.exports = mongoose.model("Writer", schema)