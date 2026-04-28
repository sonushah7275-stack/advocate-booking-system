import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import advocateRouter from "./routes/advocateRoute.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();
// console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);

const app = express();
const port = process.env.PORT || 4000;

// ✅ Fix DNS issue
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const startServer = async () => {
  try {
    // ✅ await DB connection
    await connectDB();

    // cloudinary connect
    connectCloudinary();

    // middlewares
    app.use(express.json());
    app.use(cors());

    // routes
    app.use("/api/admin", adminRouter);

    app.use("/api/advocate", advocateRouter);
    app.use("/api/user", userRouter);

    app.get("/", (req, res) => {
      res.send("API WORKING"); 
    });

    app.listen(port, () => {
      console.log(`🚀 Server Started on port ${port}`);
    });
  } catch (error) {
    console.log("❌ Server Error:", error.message);
  }
};

startServer();
