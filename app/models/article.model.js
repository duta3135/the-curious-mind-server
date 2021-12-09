module.exports = (mongoose) => {
    const schema = mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: false
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
        published: {
            type: Boolean,
            required: true
        }
    },
    {timestamps: true}
    )
    schema.method("toJSON", function(){
        const{__v, _id, ...object}=this.toObject
        object.id = _id
        return object
    })
    const Post = mongoose.model("articles", schema)
    return Post
}