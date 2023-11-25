import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRouter from './routes/auth'

dotenv.config()

const URI = process.env.MONGO_URI as string

const app = express();

// register a middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static("src/public"))

app.use("/auth",authRouter)

mongoose.connect(URI).then(() => {
  console.log('database is connected')
}).catch((err) => {
  console.log(err)
})

app.listen(5001, () => {
  console.log("Hello here am i!");
});
