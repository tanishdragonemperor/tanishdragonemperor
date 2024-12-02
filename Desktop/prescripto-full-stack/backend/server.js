// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDB from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudinary.js";
// import userRouter from "./routes/userRoute.js";
// import doctorRouter from "./routes/doctorRoute.js";
// import adminRouter from "./routes/adminRoute.js";
// import announcementRouter from './routes/announcementRoutes.js';
// import contactRouter from "./routes/contactRoutes.js";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";

// // Initialize Express App
// const app = express();
// const port = process.env.PORT || 4000;


// // Connect to MongoDB and Cloudinary
// connectDB();
// connectCloudinary();

// // Middlewares
// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());

// // API Endpoints
// app.use("/api/user", userRouter); // User-related routes
// app.use("/api/admin", adminRouter); // Admin-related routes
// app.use("/api/doctor", doctorRouter); // donor-related routes
// app.use("/api/announcements", announcementRouter); // Announcements routes
// app.use("/api/contact", contactRouter);

// // Default Route
// app.get("/", (req, res) => {
//   res.send("API Working");
// });
// const taskSchema = new mongoose.Schema({
//   text: String,
// });

// const Task = mongoose.model("Task", taskSchema);

// // Routes
// app.get("/tasks", async (req, res) => {
//   const tasks = await Task.find();
//   res.json(tasks);
// });

// app.post("/tasks", async (req, res) => {
//   const newTask = new Task({ text: req.body.text });
//   await newTask.save();
//   res.json(newTask);
// });

// app.delete("/tasks/:id", async (req, res) => {
//   await Task.findByIdAndDelete(req.params.id);
//   res.json({ message: "Task deleted" });
// });


// // Start the Server
// app.listen(port, () => console.log(`Server started on PORT: ${port}`));




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
import bodyParser from "body-parser";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

// Initialize Express App
const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB and Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// API Endpoints
app.use("/api/user", userRouter); // User-related routes
app.use("/api/admin", adminRouter); // Admin-related routes
app.use("/api/doctor", doctorRouter); // Donor-related routes
app.use("/api/announcements", announcementRouter); // Announcements routes
app.use("/api/contact", contactRouter);

// Default Route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Task Schema and Routes
const taskSchema = new mongoose.Schema({
  text: String,
});

const Task = mongoose.model("Task", taskSchema);

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const newTask = new Task({ text: req.body.text });
  await newTask.save();
  res.json(newTask);
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

// Contact Route for Sending Email
app.post('/api/contact/send-email', async (req, res) => {
  console.log("inside /route")
  const { name, email, message } = req.body;
  console.log(process.env.EMAIL_PASS)

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS  // Your email password or app password
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'tanigupt333@gmail.com',
    subject: 'Inquiry About Chapter 47',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\nI am interested in learning more about Chapter 47, especially regarding donations and membership.`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Message sent successfully');
    console.log("FINALYYY!")
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send message');
  }
});

// Start the Server
app.listen(port, () => console.log(`Server started on PORT: ${port}`));
