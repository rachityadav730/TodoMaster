import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = [];

// Define slice using createSlice
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
    editTask: (state, action) => {
      const { taskId, updatedTask } = action.payload;
      state[taskId] = updatedTask;
    },
  },
});

// Export reducer
export default taskSlice.reducer;
