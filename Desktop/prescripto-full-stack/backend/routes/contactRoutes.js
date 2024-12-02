import express from "express";
import Contact from "../models/contactModel.js";


const router = express.Router();
console.log("inside backend contactRoutes")

// POST: Create a new contact message
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: "Message saved successfully!" });
    console.log("inside cibtact 1")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save message" });
  }
});

// GET: Fetch all contact messages (for the admin portal)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;
