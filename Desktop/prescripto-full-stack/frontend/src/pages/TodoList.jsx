import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Confetti from "react-confetti";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [componentWidth, setComponentWidth] = useState(window.innerWidth); 
  const [greenButtonTasks, setGreenButtonTasks] = useState([]); 
  const componentRef = useRef(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;


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


  useEffect(() => {
    if (componentRef.current) {
      setComponentWidth(componentRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (componentRef.current) {
        setComponentWidth(componentRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


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


  const removeTask = async (id) => {
    try {
      await axios.delete(`${backendUrl}/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };


  const toggleGreenButton = (id) => {
    if (!greenButtonTasks.includes(id)) {
      setGreenButtonTasks([...greenButtonTasks, id]);


      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); 
    }
  };

  return (
    <div
      ref={componentRef} 
      className="relative z-10 bg-gradient-to-b from-white to-[#5F70FF] flex flex-col items-center justify-center py-10"
    >
      <h1 className="text-5xl font-bold text-black mb-8 drop-shadow-lg">
        Announcements
      </h1>
      <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-4xl">
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          {/* <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new announcement"
            className="flex-grow border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5F70FF]"
          />
          <button
            onClick={addTask}
            className="bg-[#5F70FF] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#495BFF] transition-all"
          >
            Add Announcement
          </button> */}
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tasks.map((task, index) => (
            <li
              key={task._id}
              className="flex flex-col justify-between bg-[#F5F7FF] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Announcement #{index + 1}
                </h3>
                <p className="text-gray-600">{task.text}</p>
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => toggleGreenButton(task._id)}
                  className={`${
                    greenButtonTasks.includes(task._id)
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  } px-4 py-2 rounded-lg hover:scale-105 transition-all`}
                >
                  Mark as Interested
                </button>
                <button
                  onClick={() => removeTask(task._id)}
                  className="bg-[#FF5F5F] text-white px-4 py-2 rounded-lg hover:bg-[#FF4040] transition-all"
                >
                  I would go
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showConfetti && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-50">
          <Confetti
            width={componentWidth} 
            height={window.innerHeight}
            numberOfPieces={250}
          />
        </div>
      )}
    </div>
  );
};

export default TodoList;
