// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Announcements = () => {
//   const [announcements, setAnnouncements] = useState([]);

//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const response = await axios.get(`${process.env.VITE_BACKEND_URL}/announcements`);
//         setAnnouncements(response.data);
//       } catch (error) {
//         console.error('Error fetching announcements:', error);
//       }
//     };

//     fetchAnnouncements();
//   }, []);

//   return (
//     <div className="announcements-container">
//       <style>{`
//         .announcements-container {
//           max-width: 800px;
//           margin: 20px auto;
//           font-family: Arial, sans-serif;
//         }
//         .announcement-card {
//           background: #f9f9f9;
//           padding: 20px;
//           border: 1px solid #ddd;
//           border-radius: 5px;
//           margin-bottom: 15px;
//         }
//         .announcement-card h3 {
//           margin: 0 0 10px;
//         }
//         .announcement-card p {
//           margin: 0 0 5px;
//         }
//         .timestamp {
//           font-size: 0.9em;
//           color: #666;
//         }
//       `}</style>
//       <h1>Announcements</h1>
//       {announcements.length > 0 ? (
//         <div>
//           {announcements.map((announcement) => (
//             <div key={announcement._id} className="announcement-card">
//               <h3>{announcement.title}</h3>
//               <p>{announcement.message}</p>
//               <p className="timestamp">
//                 {new Date(announcement.createdAt).toLocaleString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No announcements available.</p>
//       )}
//     </div>
//   );
// };

// export default Announcements;






import React, { useState } from "react";

const AddTaskForm = ({ addTask }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      addTask(value);
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        placeholder="Enter a title for this task…"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">
        <i className="fas fa-plus"></i>
      </button>
    </form>
  );
};

const ToDoList = () => {
  const [tasks, setTasks] = useState([
    { text: "Like", isCompleted: false },
    { text: "Comment", isCompleted: false },
    { text: "Subscribe", isCompleted: false },
  ]);

  const addTask = (text) => setTasks([...tasks, { text, isCompleted: false }]);

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div>
      <style>{`
        body {
          font-family: 'Teko', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          height: 100vh;
          margin: 0;
          font-size: 2em;
          box-sizing: border-box;
          background: #833ab4;
          background: -webkit-linear-gradient(to right, #2980B9, #6DD5FA, #FFFFFF);
          background: linear-gradient(to right, #2980B9, #6DD5FA, #FFFFFF);
          color: #fff;
        }
        
        .todo-list {
          padding-top: 10px;
          width: 400px;
        }
        
        .todo {
          background: #fff;
          box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
          padding: 3px 10px;
          font-size: 0.7em;
          margin-bottom: 6px;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #000;
        }
        
        .todo-text {
          cursor: pointer;
        }
        
        .todo-completed {
          text-decoration: line-through;
        }
        
        button {
          border: 0;
          outline: 0;
          cursor: pointer;
          font-size: 18px;
        }
        
        .todo button {
          color: #f37070;
          background: transparent;
        }
        
        input {
          background: #fff;
          box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
          padding: 7px 10px;
          font-size: 0.5em;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          color: #000;
          outline: 0;
          border: 0;
          flex: 1;
        }
        
        form {
          border-top: 1px solid;
          display: flex;
          padding-top: 10px;
          margin-top: 10px;
        }
        
        form button {
          color: #2980B9;
          background: #fff;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          border-left: 1px solid #ccc;
          box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
          padding: 0 15px;
        }
      `}</style>
      <div className="todo-list">
        {tasks.map((task, index) => (
          <div className="todo" key={index}>
            <span
              onClick={() => toggleTask(index)}
              className={task.isCompleted ? "todo-text todo-completed" : "todo-text"}
            >
              {task.text}
            </span>
            <button onClick={() => removeTask(index)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        ))}
        <AddTaskForm addTask={addTask} />
      </div>
    </div>
  );
};

export default ToDoList;
