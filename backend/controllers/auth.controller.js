import userModel from "../models/user.model.js";
import { hashPassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password should be atleast 6 characters" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new userModel({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json("Invalid user data");
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json("Invalid email or password");

    generateToken(user._id, res);
    return res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfilePic = async (req, res) => {
  try {
    const userId = req.user._id;
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "No image provided" });
    }

    const uploadResult = await cloudinary.uploader.upload(image, {
      folder: "profile_pics",
      public_id: userId,
      overwrite: true,
    });

    const user = await userModel.findByIdAndUpdate(
      userId,
      { profilePic: uploadResult.secure_url },
      { new: true }
    );

    return res.status(200).json({
      message: "Image uploaded successfully",
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error uploading image:", error.message);
    return res.status(500).json({ message: "Image upload failed" });
  }
};

const checkAuth = async (req, res) => {
  res.status(200).json({
    id: req.user._id,
    fullName: req.user.fullName,
    email: req.user.email,
    profilePic: req.user.profilePic,
  });
};

export { signup, login, logout, updateProfilePic, checkAuth };
