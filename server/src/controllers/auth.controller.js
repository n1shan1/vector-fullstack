import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";
import { error } from "console";
import cloudinary from "../lib/cloudinary.js";

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      res.status(400).json({
        success: false,
        message: "[authController/signUp]: Please fill in all fields.",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "[authController/signUp]: Password must be at least 6 characters long!",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      genera;
      return res.status(400).json({
        success: false,
        message:
          "[authController/signUp]: The user already exists in the database, please login to your account!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      return res.status(200).json({
        success: true,
        message: "[authController/signUp]: User created successfully!",
        user: {
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          profilePic: newUser.profilePic,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: `[authController/signUp]: Invalid user credentials, please enter the correct data! ${error.message}`,
      });
    }

    //create user
    //hash passwords
    //send token
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `[authController/signUp]: Server error: ${error.message}`,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "[authController/login]: The user with that credentials do not exist in the database, please check the credentials!",
      });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(400).json({
        success: false,
        message:
          "[authController/login]: Invalid credentials, please check the credentials!",
      });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      success: true,
      message: "[authController/login]: Logged in successfully!",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: `[authController/login]: Server error: ${error.message}`,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 }); //clearing the cookie
    res.status(200).json({
      success: true,
      message: "[authController/logout]: Logged out Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(200).json({
      success: false,
      message: `[authController/logout]: Server error: ${error.message}`,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({
        success: false,
        message:
          "[authController/updateProfile]: Please upload a profile picture!",
      });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message:
        "[authController/updateProfile]: Profile picture updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: `[authController/updateProfile]: Server error: ${error.message}`,
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: `[authController/checkAuth]: Server error: ${error.message}`,
    });
  }
};
