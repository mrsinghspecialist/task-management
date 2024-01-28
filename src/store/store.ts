import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./slices/profileSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import tasksSlice from "./slices/tasksSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedProfileReducer = persistReducer(persistConfig, profileSlice);
const persistedTasksReducer = persistReducer(
  {
    key: "tasks",
    storage,
  },
  tasksSlice
);

export const store = configureStore({
  reducer: {
    profile: persistedProfileReducer,
    tasks: persistedTasksReducer,
  },
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
