import mongoose from "mongoose"

const ArticleSchema = new mongoose.Schema({
    author:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
    
    }
},{timestamps:true})