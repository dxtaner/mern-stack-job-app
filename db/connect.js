import mongoose from "mongoose";

const mongoURI =
  "mongodb+srv://taner16:taner123@cluster0.guofsiq.mongodb.net/jobs-app";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    throw error;
  }
};

export default connectDB;
