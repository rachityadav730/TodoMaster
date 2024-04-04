import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./reducers";

// Create store using configureStore
const store = configureStore({
  reducer: taskReducer,
});

export default store;
