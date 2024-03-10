import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";

import { protect } from "./module/user";
import userRouter from "./routes/user";
import podcastRouter from "./routes/podcast";
dotenv.config();
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  console.log("HELLO");
  res.status(200);
  res.json({ message: "HEllo" });
});

app.use("/api/user", userRouter);

app.use("/api/podcast", podcastRouter);

export default app;
