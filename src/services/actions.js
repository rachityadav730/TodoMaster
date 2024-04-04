import { createAction } from "@reduxjs/toolkit";

// Define action creators
export const addTask = createAction("tasks/addTask");
export const deleteTask = createAction("tasks/deleteTask");
export const editTask = createAction("tasks/editTask");
