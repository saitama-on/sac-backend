import epxress from "express"
import { LoginUser , LogoutUser, RegisterUser } from "../Controllers/user.Controller.js"
import { verifyJwt } from "../Middlewares/auth.js"

const router = epxress.Router()

router.post('/login',  LoginUser )
router.post('/signup' , RegisterUser)


//protected Routes
router.post('/logout' , verifyJwt , LogoutUser)



export default router