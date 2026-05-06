import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import router from "./routes/index.routes.js";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", router);

export default app;
