import {Article} from "../Models/article.Model.js"


const createArticle = async(req , res) =>{
    try{
        const {content , coverImage} = req.body
        const user = req.user
        if(!user || content.length < 200){
            return res.status(400).json({message:"Content too short!"})
        }

        console.log(user)
        res.status(200).json({message:"ok" , user})
    }catch(err){
        res.status(500).json({message:"Couldn't create new Article"})
    }
}

export {createArticle}