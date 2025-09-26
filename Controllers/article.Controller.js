import {Article} from "../Models/article.Model.js"
import {isValidObjectId} from "mongoose"

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
const updateArticle = async (req , res)=>{
    try{
        const {title , content} =req.body
        const {articleId} = req.params
        if(!articleId || !isValidObjectId(articleId))   return res.status(500).json({
            status:500,
            message:" parameter error"

        })
        if(!title && !content)  return res.status(401).json({
            status:401,
            message:"please fill details"

        })
        const article = await Article.findById(articleId)
        if(!article) res.status(500).json({message:"Couldn't fetch Article"})
        if(title.trim()) article.title = title
        if(content.trim()) article.content = content
        await article.save({validateBeforeSave:false})
        const updatedArticle = await Article.findById(articleId).select("-author -authorName")
        if(!updatedArticle) return res.status(500).json({
            status:500,
            message:"cant update article"
        })
        return res.status(200).json({
            updatedArticle:updatedArticle,
            message:"article updated"
        })


    } catch (e) {
        res.status(500).json({message:e.message})

    }

}
const deleteArticle = async (req , res) =>{
    try{
        const {articleId} = req.params
        if(!articleId || !isValidObjectId(articleId))  return res.status(500).json({
            status:500,
            message:" parameter error"

        })

        const article = await Article.findByIdAndDelete(articleId)
        if(!article) return res.status(500).json({
            status:500,
            message:"cant delete article"
        })
        return res.status(200).json({
            status:200,
            deletedArticle:article
        })

    } catch (e){
        res.status(500).json({message:e.message})
    }
}


const getArticles = async(req,res)=>{
    try {
        let article_array = []
        const articles = await Article.find({}).sort({createdAt: -1}); // isko sort by  created at krdiyoo
        if(!articles) return res.status(500).json({
            status:500,
            message:"cant fetch articles"
        })

        return res.status(200).json({
            articles:articles,
            message:"here are your articles"
        })
    } catch (e){
        res.status(500).json({message:e.message})

    }
}

export {createArticle , getArticles}