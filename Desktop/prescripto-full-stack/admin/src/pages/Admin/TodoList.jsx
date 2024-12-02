import React, { useState, useEffect } from "react";
import axios from "axios";
import Confetti from "react-confetti";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${backendUrl}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [backendUrl]);

  // Add a new task to the backend
  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const response = await axios.post(`${backendUrl}/tasks`, {
          text: newTask,
        });
        setTasks([...tasks, response.data]);
        setNewTask("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  // Mark task as complete and remove from backend
  const toggleComplete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));

      // Trigger confetti
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000); // Stop confetti after 3 seconds
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
// className="w-full max-w-6xl m-5  min-h-screen flex items-center justify-center bg-gray-100"
  return (
    <div className="w-full max-w-6xl m-5 min-h-screen flex flex-col items-center justify-start bg-[#F8F9FD] py-10 px-4">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Announcements</h1>
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new announcement"
            className="flex-grow border border-gray-300 rounded-lg p-3 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5F70FF]"
          />
          <button
            onClick={addTask}
            className="bg-[#5F70FF] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#495BFF] transition-all"
          >
            Add Announcement
          </button>
        </div>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center bg-[#F5F7FF] p-4 rounded-lg shadow-sm"
            >
              <span className="text-gray-800 font-medium">{task.text}</span>
              <button
                onClick={() => toggleComplete(task._id)}
                className="bg-[#5F70FF] text-white px-4 py-2 rounded-lg hover:bg-[#495BFF] transition-all"
              >
                Complete
              </button>
            </li>
          ))}
        </ul>
      </div>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={150}
        />
      )}
    </div>
  );
};

export default TodoList;
