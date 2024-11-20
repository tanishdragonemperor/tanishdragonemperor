import Announcement from '../models/announcementModel.js';

// Fetch all announcements
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching announcements' });
  }
};

// Add a new announcement
export const addAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;
    if (!title || !message) {
      return res.status(400).json({ error: 'Title and Message are required' });
    }

    const newAnnouncement = new Announcement({ title, message });
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(500).json({ error: 'Error adding announcement' });
  }
};

// Delete an announcement by ID
export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    await Announcement.findByIdAndDelete(id);
    res.status(200).json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting announcement' });
  }
};
