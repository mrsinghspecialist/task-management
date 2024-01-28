import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Task } from "../../interfaces/Task";

interface TaskState {
  tasksList: Task[];
}

const initialState: TaskState = {
  tasksList: [],
};

const tasks = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addNewTask: (state, action: { payload: Omit<Task, "id"> }) => {
      const id = state.tasksList[state.tasksList.length - 1]?.id ?? 0;
      state.tasksList = [...state.tasksList, { ...action.payload, id: id + 1 }];
    },
    deleteTask: (state, action: { payload: number }) => {
      state.tasksList = state.tasksList.filter(
        (value) => value.id !== action.payload
      );
    },
    updateTask: (state, action: { payload: Task }) => {
      state.tasksList = state.tasksList.map((value) => {
        if (value.id === action.payload.id) {
          return action.payload;
        }
        return value;
      });
    },
  },
});

const selectTasksState = (state: RootState): RootState["tasks"] => state.tasks;

export const selectAllTasks = createSelector(
  selectTasksState,
  (tasksState) => tasksState.tasksList
);

export const { addNewTask, deleteTask, updateTask } = tasks.actions;

export default tasks.reducer;
