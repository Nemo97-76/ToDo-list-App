import React, { useState }  from "react";
import "./App.css";
import { AiOutlineMoon, AiOutlineSun } from "react-icons/ai";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';


// my todo list in array  must have id ,text and completed(boolean) properties
//never use a single boolean state for all items
//use .map to update specific item based on its id
// pass task.id to identify which task was clicked
//use todo.completed (not shared  variable) for checkbox and styling

//TODO: 1. edit task functionality with modal
//TODO: 2. dark/light mode styling improvements
function App() {
  const [checked, setChecked] = useState(false);
  const [newTask, setNewTask] = useState("");

const [editingIndex, setEditingIndex] = useState(-1);
const [editText, setEditText] = useState('');  
  const [open, setOpen] = useState(false);

  const [DarkMode, setDarkMode] = useState(false);
  
  // tasks state: initialize from localStorage (if present)
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse tasks from localStorage:", e);
      return [];
    }
  });
/* console.log(tasks);
 */
const ToggleToDo=(id)=>{
  setTasks(tasks.map((task)=>task.id===id ? {...task, completed: !task.completed} : task))
}
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
    const newItem = { id: Date.now(), text,completed: false };
    setTasks((prev) => [...prev, newItem]);
    setNewTask("");
  };

  //edit task handler
  const startEdit = (index, text) => {
    setEditingIndex(index);
    setEditText(text);
  };

  const saveEdit = (index) => {
    if(!editText.trim()) return; // ignore empty edits
    const newTasks = [...tasks];
    newTasks[index].text = editText
    setTasks(newTasks);
    setEditingIndex(-1);
  }

  //delete task handler
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const EditWModal=()=>{
 const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <Button
        onClick={() => setOpen(true)}
        id="edit"
        className="task-buttons"
        endDecorator={<EditRoundedIcon sx={{color:"rgb(48, 218, 48)"}} />}
      >
        </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Edit task</DialogTitle>
          <DialogContent>update task</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>task</FormLabel>
                <Input autoFocus required />
              </FormControl>
              <Button type="submit"  onClick={()=>startEdit(index,tasks.text)}>Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
    )  }

  return (
    <div className="App">
      <div className="notesIMG">
        <h2>
          ToDo list App
          <Button id="Dark-LightBTN" onClick={() => setDarkMode(!DarkMode)}>
            {DarkMode ? <AiOutlineSun /> : <AiOutlineMoon />}
          </Button>
        </h2>
      </div>

      <div className= "inputs">
        <div id="taskInput">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            type="text"
            placeholder="Add a new task..."
          />
          <Button id="addTask" onClick={handleAddTask} endDecorator={<AddRoundedIcon />}>
          </Button>
{/*           <button id="addTask" onClick={handleAddTask}>
            <AddRoundedIcon />
          </button>
 */}        </div>

        <div className="tasks">
          {tasks.map((task,index) => (
            <div className="task">
              <div className="checkbox-wrapper" key={index}>
                <input
                  onClick={() => ToggleToDo(task.id)}
                  checked={task.completed}
                  id="task"
                  type="checkbox"
                  className="custom-checkbox"
                />
                <label
                  for="task"
                  className={task.completed ? "lineThrough labeltext" : "labeltext"}
                >
                  {task.text}
                </label>

              <EditWModal />
              {/*   <button id="delete" onClick={()=>deleteTask(index)} className="task-buttons">
                  <MdOutlineDelete />
                </button> */}

                <Button id="delete" onClick={()=>deleteTask(index)} className="task-buttons" endDecorator={<DeleteForeverRoundedIcon sx={{color:"rgb(192, 99, 99)" ,fontSize:"35px"}}/>}>
                </Button>
              
              </div>
            </div>
          ))}
          <span>total tasks : <b>{tasks.length}</b> </span>
        </div>
      </div>
    </div>
  );
}

export default App;
