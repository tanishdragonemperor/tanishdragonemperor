import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", message: "" });
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  // Fetch announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${process.env.VITE_BACKEND_URL}/announcements`);
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  // Add or update an announcement
  const handleSubmit = async () => {
    try {
      if (editingAnnouncement) {
        // Update announcement
        await axios.put(
          `${process.env.VITE_BACKEND_URL}/announcements/${editingAnnouncement._id}`,
          newAnnouncement,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
      } else {
        // Add announcement
        await axios.post(`${process.env.VITE_BACKEND_URL}/announcements`, newAnnouncement, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }

      setNewAnnouncement({ title: "", message: "" });
      setEditingAnnouncement(null);

      // Refresh announcements
      const response = await axios.get(`${process.env.VITE_BACKEND_URL}/announcements`);
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error saving announcement:", error);
    }
  };

  // Delete an announcement
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.VITE_BACKEND_URL}/announcements/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAnnouncements(announcements.filter((a) => a._id !== id));
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  return (
    <div className="admin-announcements-container">
      <style>{`
        .admin-announcements-container {
          max-width: 800px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
        }
        .announcement-form {
          background: #f9f9f9;
          padding: 15px;
          border: 1px solid #ddd;
          margin-bottom: 20px;
        }
        .announcement-form input,
        .announcement-form textarea {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ddd;
          border-radius: 3px;
        }
        .announcement-form button {
          padding: 10px 20px;
          background: #28a745;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 3px;
        }
        .announcement-form button:hover {
          background: #218838;
        }
        .announcements-list {
          margin: 20px 0;
        }
        .announcement-card {
          background: #f9f9f9;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 5px;
          margin-bottom: 10px;
        }
        .admin-actions {
          margin-top: 10px;
        }
        .admin-actions button {
          margin-right: 5px;
          padding: 5px 10px;
          background: #007bff;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 3px;
        }
        .admin-actions button:hover {
          background: #0056b3;
        }
      `}</style>
      <h1>Manage Announcements</h1>

      <div className="announcement-form">
        <h2>{editingAnnouncement ? "Edit Announcement" : "Add Announcement"}</h2>
        <input
          type="text"
          placeholder="Title"
          value={newAnnouncement.title}
          onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
        />
        <textarea
          placeholder="Message"
          value={newAnnouncement.message}
          onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
        ></textarea>
        <button onClick={handleSubmit}>
          {editingAnnouncement ? "Update Announcement" : "Add Announcement"}
        </button>
      </div>

      <div className="announcements-list">
        {announcements.map((announcement) => (
          <div key={announcement._id} className="announcement-card">
            <h3>{announcement.title}</h3>
            <p>{announcement.message}</p>
            <div className="admin-actions">
              <button onClick={() => setEditingAnnouncement(announcement)}>Edit</button>
              <button onClick={() => handleDelete(announcement._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAnnouncements;
