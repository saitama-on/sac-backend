import express from "express"
import { createArticle ,
    getArticles
} from "../Controllers/article.Controller.js"
import {verifyJwt} from "../Middlewares/auth.js";
import {upload_mul} from "../Middlewares/multer.middleware.js";


const router = express.Router()
router.use(verifyJwt)

//right now assuming no article image is being uploaded
//even if image , i'll take image as a url 
router.post('/create-article' , verifyJwt , createArticle)


// router.get('/get-articels' , getArticles)


export default router