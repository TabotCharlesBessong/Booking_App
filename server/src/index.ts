import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routers/user.router";
import adminRouter from "./routers/admin.router";
import movieRouter from "./routers/movie.router";
import ticketRouter from "./routers/ticket.router";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import swaggerDocs from "./utils/swagger";

dotenv.config();

const URI = process.env.MONGO_URI as string;

const app = express();
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Movie Booking App Server",
      version: "1.0.0",
    },
    servers: [
      {
        api: "http://localhost:5001/",
      },
    ],
  },
  apis: ["./index.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const port = (process.env.PORT as string) || 5000;

// register a middleware
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5137"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("src/public"));

app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/movie", movieRouter);
app.use("/api/ticket", ticketRouter);

mongoose
  .connect(URI)
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`The server is running on port number ${port}....`);
  swaggerDocs(app,port)
});
