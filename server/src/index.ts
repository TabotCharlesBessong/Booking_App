import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const URI = process.env.MONGO_URI as string

const app = express();

mongoose.connect(URI).then(() => {
  console.log('database is connected')
}).catch((err) => {
  console.log(err)
})

app.listen(3000, () => {
  console.log("Hello here am i!");
});
