import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("[server]: Connected to the mongodb client!");
  } catch (error) {
    console.log("[server]: Mongodb connection error!", error.message);
  }
};
