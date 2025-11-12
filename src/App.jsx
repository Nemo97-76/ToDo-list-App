import React from "react";
import "./App.css";
import { AiOutlineMoon, AiOutlineSun } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { IoAdd } from "react-icons/io5";

function App() {
  const [checked, setChecked] = React.useState(false);
  const [newTask, setNewTask] = React.useState("");
  const [DarkMode, setDarkMode] = React.useState(false);
  // tasks state: initialize from localStorage (if present)
  const [tasks, setTasks] = React.useState(() => {
    try {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse tasks from localStorage:", e);
      return [];
    }
  });

  // persist tasks to localStorage whenever they change
  React.useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (e) {
      console.error("Failed to save tasks to localStorage:", e);
    }
  }, [tasks]);

  // handler to add a new task to the tasks array (and localStorage via effect)
  const handleAddTask = () => {
    const text = newTask.trim();
    if (!text) return; // ignore empty entries
    const newItem = { id: Date.now(), text };
    setTasks((prev) => [...prev, newItem]);
    setNewTask("");
  };

  console.log("newTask:", newTask);
  console.log("tasks:", tasks);

  return (
    <div className="App">
      <div className="notesIMG">
        <h2>
          ToDo list App
          <button onClick={() => setDarkMode(!DarkMode)}>
            {DarkMode ? <AiOutlineSun /> : <AiOutlineMoon />}
          </button>
        </h2>
      </div>
      <div className="inputs">
        <div id="taskInput">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            type="text"
            placeholder="Add a new task..."
          />
          <button id="addTask" onClick={handleAddTask}>
            <IoAdd />
          </button>
        </div>

        <div className="tasks">
          {tasks.map((task) => (
            <div className="task">
              <div className="checkbox-wrapper">
                <input
                  onClick={() => setChecked(!checked)}
                  id="task"
                  type="checkbox"
                  className="custom-checkbox"
                />
                <label
                  for="task"
                  className={checked ? "lineThrough labeltext" : "labeltext"}
                >
                  {task.text}
                </label>

                <button id="edit" className="task-buttons">
                  <FiEdit2 />
                </button>
                <button id="delete" className="task-buttons">
                  <MdOutlineDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
