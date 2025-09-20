import express from "express"
import { createArticle 
} from "../Controllers/article.Controller"
import {verifyJwt} from "../Middlewares/auth.js";
import {upload_mul} from "../Middlewares/multer.middleware.js";


const router = express.Router()
router.use(verifyJwt)

//right now assuming no article image is being uploaded
//even if image , i'll take image as a url 
router.post('/create-article' , verifyJwt , createArticle)


export default router