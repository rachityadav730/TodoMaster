import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, editTask } from "../services/actions";
import Task from "./Task";
import TaskForm from "./TaskForm";

function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state);

  const [showForm, setShowForm] = useState(false);

  const handleAddTask = (task) => {
    dispatch(addTask(task));
    setShowForm(false);
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleEditTask = (taskId, updatedTask) => {
    dispatch(editTask(taskId, updatedTask));
  };

  return (
    <div>
      <div className="menu">
        <h2>All Task</h2>
        <button className="btn" onClick={() => setShowForm(true)}>
          Add New Task
        </button>
      </div>

      {showForm && (
        <TaskForm
          onAddTask={handleAddTask}
          openForm={showForm}
          setOpenForm={setShowForm}
        />
      )}
      <ul className="ul">
        {tasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            onDelete={() => handleDeleteTask(index)}
            onEdit={(updatedTask) => handleEditTask(index, updatedTask)}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;