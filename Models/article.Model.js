import mongoose from "mongoose"

const ArticleSchema = new mongoose.Schema({
    author:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    authorName:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
    
    }
},{timestamps:true})

const Article = new mongoose.model('Article' , ArticleSchema)

export {Article}