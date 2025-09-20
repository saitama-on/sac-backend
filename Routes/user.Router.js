import epxress from "express"
import { LoginUser , LogoutUser, RegisterUser } from "../Controllers/user.Controller.js"
import { verifyJwt } from "../Middlewares/auth.js"
import {upload_mul} from "../Middlewares/multer.middleware.js";

const router = epxress.Router()

router.post('/login',  LoginUser )
router.post('/signup' ,upload_mul.single("profileImage"), RegisterUser)


//protected Routes
router.post('/logout' , verifyJwt , LogoutUser)



export default router