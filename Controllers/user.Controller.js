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
const UpdateUser = async (req,res)=>{

    try{

        const {username , displayName} = req.body
        if(!username && !displayName) return res.status(401).json({status : 401 , message:"fill at least one detail"})
        const user = await User.findById(req.user._id).select("-password")
        if(!user) return  res.status(500).json({status : 500 , message:"user cant be fetched"})
        if(username.trim()) user.username = username.trim()
        if(displayName.trim()) user.displayName = displayName.trim()

        await user.save({validateBeforeSave : false})
        return res.status(200).json({
            updatedUser:user,
            message:"user updated"
        })


    } catch (e){
        return res.status(500).json({
            status:500,
            message:e.message
        })

    }
}
const UpdateUserProfileImage = async (req,res) =>{
    try {
        const path = req?.file?.path
        if(!path) return res.json({status : 500 , message:"multer error"})
        //isko server pr krliyo upload and get the url or whatever

        const updatedImage = await User.findByIdAndUpdate(req.user._id , {
            $set:{
                profileImage:"" // url daldiyoo
            }
        } , {new :true}).select("-password")
        if(!updatedImage) return  res.json({status : 500 , message:"user cant be fetched"})

        return res.status(200).json({
            UpdatedData:updatedImage,
            message:"updated profile image"
        })

    } catch (e) {
        return res.status(500).json({
            status:500,
            message:e.message
        })


    }
}
const GetUserArticles = async (req,res) =>{
    try {
        const userArticles = await User.aggregate([{
            $match:{
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },{
            $lookup:{
                from:"articles",
                localField:"_id",
                foreignField:"author",
                pipeline:[{
                    $project:{
                        title:1,
                        content:1,
                        coverImage:1
                    }
                }],
                as:"articles"
            }
        },{
            $project:{
                articles:1
            }
        }])
        if(userArticles.length ===0 || userArticles[0].articles.length === 0) res.status(500).json({
            status:500,
            message:"your articles cant be fetched "
        })

        res.status(200).json({
            userArticles:userArticles[0].articles, // array of article document mill jayenge
            message:"here are your articles"
        })

    } catch (e) {
        return res.status(500).json({
            status:500,
            message:e.message
        })




    }
}



export {LoginUser , LogoutUser , RegisterUser , UpdateUser , UpdateUserProfileImage ,GetUserArticles}