import userModel from "../models/user.model.js";
import { hashPassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

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
  res.send("Logged in successfully");
};

const logout = async (req, res) => {
  res.send("Logged out successfully");
};

const updateProfilePic = async (req, res) => {
  res.send("Profile picture updated successfully");
};

export { signup, login, logout, updateProfilePic };
