import React, { useEffect, useState } from "react";
import axios from "axios";

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("Component mounted, fetching messages..."); // Debugging log
    const fetchMessages = async () => {
      try {
        const response = await axios.get("/api/admin/inbox", {
          headers: {
            atoken: localStorage.getItem("atoken"), // Pass admin token
          },
        });
        console.log("API response:", response); // Debugging log

        if (response && response.data) {
          setMessages(response.data);
        } else {
          console.error("Invalid response structure:", response);
          setMessages([]);
        }
        setError(false);
      } catch (error) {
        console.error("Error fetching messages:", error); // Debugging log
        setError(true);
      } finally {
        setLoading(false);
        console.log("Finished fetching messages."); // Debugging log
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    console.log("Loading state active."); // Debugging log
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading inbox...</p>
      </div>
    );
  }

  if (error) {
    console.log("Error state active."); // Debugging log
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-500">
          Failed to load messages. Please try again later.
        </p>
      </div>
    );
  }

  if (messages.length === 0) {
    console.log("No messages found."); // Debugging log
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-semibold text-gray-500">No New Messages</p>
      </div>
    );
  }

  console.log("Rendering messages:", messages); // Debugging log
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Contact Inbox</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Message</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message._id}>
              <td className="border border-gray-300 px-4 py-2">{message.name}</td>
              <td className="border border-gray-300 px-4 py-2">{message.email}</td>
              <td className="border border-gray-300 px-4 py-2">{message.message}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(message.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inbox;
