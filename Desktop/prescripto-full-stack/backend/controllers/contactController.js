import Contact from "../models/contactModel.js"; // Ensure this model exists

// Controller to fetch all contact messages
export const getAllMessages = async (req, res) => {
    try {
      console.log("Incoming request to /api/admin/inbox"); // Log when the endpoint is hit
      const messages = await Contact.find().sort({ createdAt: -1 });
      console.log("Fetched messages:", messages); // Log the fetched messages
      res.status(200).json(messages || []); // Always return an array
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  };
  
