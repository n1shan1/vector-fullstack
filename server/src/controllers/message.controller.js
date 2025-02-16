import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const filteredUser = await User.find({ _id: { $ne: loggedUserId } }).select(
      "-password"
    );
    res.status(200).json({
      success: true,
      message:
        "[messageController/getUserForSidebar]: Users Fetched Successfully",
      user: filteredUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: `[messageController/getUserForSidebar]: Server error: ${error.message}`,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatWith } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatWith },
        { senderId: userToChatWith, receiverId: myId },
      ],
    });
    res.status(200).json({
      success: true,
      message: "[messageController/getMessages]: Messages Fetched Successfully",
      messages,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: `[messageController/getMessages]: Server error: ${error.message}`,
    });
  }
};

export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    // console.log(req.body);
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if (image) {
      //upload bas64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      image: imageUrl,
      text,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(200).json({
      success: true,
      message: "[messageController/sendMessages]: Message Sent Successfully",
      newMessage,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: `[messageController/sendMessages]: Server error: ${error.message}`,
    });
  }
};
