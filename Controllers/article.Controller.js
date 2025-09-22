import {Article} from "../Models/article.Model.js"


const createArticle = async(req , res) =>{
    try{
        const {content , title, coverImage} = req.body
        const user = req.user
        if(!user || !title || content.length < 200){
            return res.status(400).json({message:"Content too short! // empty fields"})
        }

        let new_article = await Article.create({
            title:title,
            content:content,
            author:user._id,
            authorName:user.DisplayName,
            coverImage:coverImage || ""
        })

        console.log(new_article)

        console.log(user)
        res.status(200).json({message:"ok" , user})
    }catch(err){
        res.status(500).json({message:"Couldn't create new Article"})
    }
}


const getArticles = async(req,res)=>{
    let article_array= []
    const articles = await Article.find();
    console.log(articles);
}

export {createArticle , getArticles}