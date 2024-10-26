const mongoose=require("mongoose")

const blogSchema=mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    image:{
        type:String
    }
})

module.exports = mongoose.model("blog", blogSchema)
