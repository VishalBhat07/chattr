import messageModel from "../models/message.model.js";
import userModel from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const filteredUsers = await userModel
      .find({ _id: { $ne: loggedUserId } })
      .select("-password");
    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in fetching users:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await messageModel.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in fetching messages:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { id: receiverId } = req.params;
    const { text, image } = req.body;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new messageModel({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // add socket.io later

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sending message:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { getUsersForSidebar, getMessages, sendMessage };
