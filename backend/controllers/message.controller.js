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
    const { text } = req.body;
    let imageUrl;

    if (req.file) {
      // req.file.buffer contains the uploaded image file in memory
      // Upload to Cloudinary using buffer instead of base64 string
      const uploadResponse = await cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) {
            throw error;
          }
          imageUrl = result.secure_url;

          // Save message only after upload completes
          const newMessage = new messageModel({
            senderId,
            receiverId,
            text,
            image: imageUrl,
          });

          newMessage
            .save()
            .then((savedMessage) => res.status(201).json(savedMessage))
            .catch((err) => res.status(500).json({ message: "DB save error" }));
        }
      );

      // Pipe the file buffer to Cloudinary uploader
      const stream = uploadResponse;
      stream.end(req.file.buffer);
    } else {
      // No image, just save text message
      const newMessage = new messageModel({
        senderId,
        receiverId,
        text,
      });
      await newMessage.save();
      return res.status(201).json(newMessage);
    }
  } catch (error) {
    console.log("Error in sending message:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { getUsersForSidebar, getMessages, sendMessage };
