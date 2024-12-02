import express from "express";
import { loginAdmin, appointmentsAdmin, appointmentCancel, addDoctor, allDoctors, adminDashboard } from "../controllers/adminController.js";
import { changeAvailablity } from "../controllers/doctorController.js";
import { getAllMessages } from "../controllers/contactController.js"; // Import the new controller
import authAdmin from "../middleware/authAdmin.js";
import upload from "../middleware/multer.js";


const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/", loginAdmin);
adminRouter.post("/add-donor", authAdmin, upload.single("image"), addDoctor);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);
adminRouter.get("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailablity);
adminRouter.get("/dashboard", authAdmin, adminDashboard);

// New route for fetching inbox messages
adminRouter.get("/inbox", authAdmin, getAllMessages);

export default adminRouter;
