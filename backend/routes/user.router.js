import express from "express";
import {
  login,
  logout,
  signup,
  updateProfilePic,
} from "../controllers/auth.controller.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

userRouter.put("/update-pfp", updateProfilePic);

export default userRouter;
