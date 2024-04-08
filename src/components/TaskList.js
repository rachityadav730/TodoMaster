import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, editTask } from "../services/actions";
import Task from "./Task";
import TaskForm from "./TaskForm";
import axios from "axios";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Heading,
  Select,
  Flex,
  FormLabel,
} from "@chakra-ui/react";

function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState("all");
  const [taskFilter, setTaskFilter] = useState("all");
  const [users, setUsers] = useState([]);
  const [dueDatePassed, setDueDatePassed] = useState(false);

  useEffect(() => {
    const storedUsers = localStorage.getItem("all_users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (!task) {
      return false;
    }

    const userId =
      task != undefined && task.assign_user_id !== null
        ? task.assign_user_id.toString()
        : null;
        console.log("userId",typeof userId,typeof selectedUser)
    if (selectedUser !== "all" && userId !== selectedUser) {
      return false;
    }
    if (taskFilter !== "all" && task.status !== taskFilter) {
      return false;
    }
    if (dueDatePassed && new Date(task.submission_date) >= new Date()) {
      return false;
    }
    return true;
  });

  const handleAddTask = (task) => {
    dispatch(addTask(task));
    setShowForm(false);
  };

  const handleDeleteTask = async (taskId) => {
    let id = tasks[taskId].id;
    const headers = {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("actualtoken"),
    };
    const API_URL = `${process.env.REACT_APP_API_URL}/api/v1/todos/${id}`
    const response = await axios.delete(
      API_URL,
      { headers }
    );
    if (response.status == 200) {
      dispatch(deleteTask(taskId));
    }
  };

  const handleEditTask = async (taskId, updatedTask) => {
    console.log("check values", taskId, updatedTask);
    let id = tasks[taskId].id;
    const headers = {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("actualtoken"),
    };
    const to_do = tasks[taskId];
    const API_URL = `${process.env.REACT_APP_API_URL}/api/v1/todos/${id}/custom_update`
    const response = await axios.post(
      API_URL,
      { to_do },
      { headers }
    );
    if (response.status == 200) {
      dispatch(editTask(taskId, updatedTask));
    }
  };

  return (
    <div>

      <Box mt={10}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading as="h2">All Task</Heading>
          <Button colorScheme="yellow" onClick={() => setShowForm(true)}>
            Add New Task
          </Button>
        </Flex>
        <Flex justifyContent="space-between" mt={4}>
          <Box>
            <FormControl>
              <FormLabel>User:</FormLabel>
              <Select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="all">All Users</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <FormControl>
              <FormLabel>Task Status:</FormLabel>
              <Select
                value={taskFilter}
                onChange={(e) => setTaskFilter(e.target.value)}
              >
                <option value="all">All Tasks</option>
                <option value="ToDo">To Do</option>
                <option value="InProgress">In Progress</option>
                <option value="Complete">Complete</option>
              </Select>
            </FormControl>
          </Box>
        </Flex>

        {/* Due Date Passed Checkbox */}
        <FormControl mt={4}>
          <FormLabel>Due Date Passed</FormLabel>
          <Checkbox
            isChecked={dueDatePassed}
            onChange={(e) => setDueDatePassed(e.target.checked)}
          >
            Due Date Passed
          </Checkbox>
        </FormControl>
      </Box>

      {showForm && (
        <TaskForm
          onAddTask={handleAddTask}
          openForm={showForm}
          setOpenForm={setShowForm}
          tasks_data={tasks}
        />
      )}
      <ul className="ul">
        {tasks &&
          filteredTasks.map((task, index) => (
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
