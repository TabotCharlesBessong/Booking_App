import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRouter from "./routers/user.router"
import adminRouter from "./routers/admin.router"
import movieRouter from "./routers/movie.router"
import cors from "cors"

dotenv.config()

const URI = process.env.MONGO_URI as string

const app = express();
const port = process.env.PORT as string || 5000

// register a middleware
app.use(cors({
  credentials:true,
  origin:["http://localhost:5137"]
}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static("src/public"))

app.use("/api/users",userRouter)
app.use("/api/admin",adminRouter)
app.use("/api/movie",movieRouter)


mongoose.connect(URI).then(() => {
  console.log('database is connected')
}).catch((err) => {
  console.log(err)
})

app.listen(port, () => {
  console.log(`The server is running on port number ${port}....`);
});
