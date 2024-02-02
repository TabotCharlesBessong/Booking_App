import express, { Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const URI: string = process.env.MONGO_URI as string;

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
});


