import User from "../Models/user.Model.js"
import mongoose from "mongoose"

//login user

const LoginUser = async(req , res)=>{
    const {username , password} = req.body

    //find for existing username if exist match password and login

    try{
        const user = await User.findOne({username:username})
        console.log(user)

        if(!user){
            res.status(400).json({message:"User not found!"})
        }

        //check password
        // console.log("here")
        if(user.password != password){
            res.status(400).json({message:"Incorrect Password!!"})
        }
        console.log("here")

        //else user is valid so generate and send token to user
        const token = await user.generateAccessToken()
        console.log(token)


        
        res.status(200)
        .cookie("accessToken" , token , {
            httpOnly:true,
            secure:true
        })
        .json({message:"Successful Login!!" , user:user})
    }
    catch(error){
        res.status(400).json({"message":"Couldn't Login! Try again"})
    }
}

const RegisterUser = async(req,res)=>{

    try{
        const {username , password , displayName } = req.body

        if(!username.trim() || !password.trim() || !displayName.trim() ){
            return res.status(400).json({message:"Empty fields!!"})
        }
        const path =  req?.file?.path
        // upload to ther server and get url

        

        const new_user = await User.create({
            username,
            password,
            displayName,
            profileImage:""//url

        })
       if(!new_user){
        return res.status(400).json({message:"Couldn't create user!"})
       }

        res.status(200).json({message:"Created!!" , user:new_user})
    }
    catch(error){
        console.log(error)
        res.status(400).json({message:"Couldn't create user!"})
    }
}

const LogoutUser = async(req,res,next)=>{
    return res.status(200)
    .clearCookie("accessToken" , {
        httpOnly:true,
        secure:true
    })
    .json({message:"Logged out!"})
}




export {LoginUser , LogoutUser , RegisterUser}