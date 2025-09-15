import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    displayName:{
        type:String,
        required:true
    },
    profileImage:{
        type:String
    }

},{timestamps:true})


UserSchema.methods.generateAccessToken = function(){

    return jwt.sign(
        {
         _id:this.id,
         username:this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:"3d"
        }

    )
}


const User = new mongoose.model("User" , UserSchema)
export default User 