import jwt from "jsonwebtoken"
import User from "../Models/user.Model.js"



const verifyJwt = async(req , res , next)=>{
    // so there is some accessToken saved in cookies
    //if not then return to login 
    //if yes then verify if the cookie is real
    try{
        const token = (req.cookies && req.cookies.accessToken)
        
        
        if(!token){
            return res.status(400).json({message:"No token found!"})
        }

        const decodedInfo =  jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
      
        const user = await User.findById(decodedInfo._id)

        if(!user){
            return res.status(400).json({message:"Invalid token"})
        }

        //user found then add user to the body

        req.user = user
        // console.log(decodedInfo)
        next()
    }
    catch(error){
        res.status(400).json({message:"Couldn't verify token!   "})
    }
}

export {verifyJwt}