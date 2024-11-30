import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";
import announcementRouter from './routes/announcementRoutes.js';
import contactRouter from "./routes/contactRoutes.js";

// Initialize Express App
const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB and Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use("/api/user", userRouter); // User-related routes
app.use("/api/admin", adminRouter); // Admin-related routes
app.use("/api/doctor", doctorRouter); // Doctor-related routes
app.use("/api/announcements", announcementRouter); // Announcements routes
app.use("/api/contact", contactRouter);

// Default Route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start the Server
app.listen(port, () => console.log(`Server started on PORT: ${port}`));
