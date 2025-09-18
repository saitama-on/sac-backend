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
const initialize_db = await connectDb()

// app.get('/' , (req,res)=>{
//     res.status(200).json({"message" : "hello"})
// })

app.use('/api/v1/users' , userRouter)
app.use('/api/v1/article' , articleRouter)

app.listen(port , ()=>{
    console.log(`Server Running on port : ${port}`)
})



