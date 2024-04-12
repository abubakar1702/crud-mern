import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import route from "./routes/userRoute.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

const connectDatabase = async () => {
  try {
    await mongoose.connect(URL);
    console.log("database is connected successfully");
  } catch (error) {
    console.log("connection failed! try again");
    console.log(error.message);
    process.exit(1);
  }
};

app.listen(PORT, async () => {
  console.log(`server is running at http://localhost:${PORT}`);
  await connectDatabase();
});

app.use("/api", route);
