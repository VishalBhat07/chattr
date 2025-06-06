import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.router.js";
import { cloudinarySetup } from "./config/cloudinary.js";
import cookieParser from "cookie-parser";
import messageRouter from "./routes/message.router.js";

dotenv.config();
const PORT = process.env.PORT;
cloudinarySetup();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
