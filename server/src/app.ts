import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import { routes } from "./routes";

//Config
const port = process.env.PORT || 8080;
export const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/api", routes);

// MongoDB connection.
mongoose
  .connect(process.env.MONGO_URI!, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  } as ConnectOptions)
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((err: any) => {
    console.error("Error:", err);
  });

// Start the server
app.listen(port);

console.log(`Server started on port ${port}`);

module.exports = app;
