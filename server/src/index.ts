<<<<<<< HEAD
import express, { Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
=======
import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRouter from "./routers/user.router"
import cors from "cors"
>>>>>>> 54e8d8b85f60b13e52414d57bc377d3259bb9128

dotenv.config();

const URI: string = process.env.MONGO_URI as string;

<<<<<<< HEAD
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('src/public'));

mongoose.connect(URI)
  .then(() => {
    console.log('database is connected');
  })
  .catch((err: any) => { // Correctly capture the error object
    console.log(err);
  });

app.listen(5001, () => {
  console.log('Hello here am i!');
=======
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


mongoose.connect(URI).then(() => {
  console.log('database is connected')
}).catch((err) => {
  console.log(err)
})

app.listen(5001, () => {
  console.log(`The server is running on port number ${port}....`);
>>>>>>> 54e8d8b85f60b13e52414d57bc377d3259bb9128
});


