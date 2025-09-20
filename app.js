import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRouter from "./Routes/user.Router.js"
import articleRouter from "./Routes/article.Router.js"
import {connectDb} from './db/db.js'


const app = express()
dotenv.config()
const port = process.env.PORT 

//
app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser())
connectDb()
    .then(()=> {
            app.listen(port, () => {
                console.log(`Server Running on port : ${port}`)
            })

            app.on('error', (error) => {
                console.log("Error in app", error)
            })
        }

    )
.catch((e)=>{
    console.log("Error in DB connection", e)

})


app.use('/api/v1/users' , userRouter)
app.use('/api/v1/article' , articleRouter)





