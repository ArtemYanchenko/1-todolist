import { AnyAction, combineReducers } from "redux";
import { tasksReducer } from "features/todolists-list/task/model/tasks-reducer";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { appReducer } from "app/appReducer";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "features/login/authReducer";
import { todolistsReducer } from "features/todolists-list/todolists/todolist-reducer";

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  tasks: tasksReducer,
  todolists: todolistsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
