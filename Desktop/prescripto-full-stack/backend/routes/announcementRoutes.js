import express from 'express';
import { 
  getAnnouncements, 
  addAnnouncement, 
  deleteAnnouncement 
} from '../controllers/announcementController.js';
import authAdmin from '../middleware/authAdmin.js'; // Middleware for admin authentication

const announcementRouter = express.Router();

// Routes for Announcements
announcementRouter.get("/", getAnnouncements); // Public route for fetching announcements
announcementRouter.post("/", authAdmin, addAnnouncement); // Admin-only route to add an announcement
announcementRouter.delete("/:id", authAdmin, deleteAnnouncement); // Admin-only route to delete an announcement

export default announcementRouter;
