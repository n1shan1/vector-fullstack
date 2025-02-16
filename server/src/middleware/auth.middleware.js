import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(403).json({
        success: false,
        message:
          "[authMiddleware/protectRoute]: Unauthorized - You are not authorized to access this route!",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(402).json({
        success: false,
        message:
          "[authMiddleware/protectRoute]: Unauthorized - Invalid token recieved!",
      });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "[authMiddleware/protectRoute]: User not found!",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: `[authMiddleware/protectRoute]: Server error: ${error.message}`,
    });
  }
};
