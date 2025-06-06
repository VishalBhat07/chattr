import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfilePic,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

userRouter.put("/update-pfp", protectRoute, updateProfilePic);
userRouter.get("/check-auth", protectRoute, checkAuth);

export default userRouter;
