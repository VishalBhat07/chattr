import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.router.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
