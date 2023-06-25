import { Dispatch } from "redux";
import { TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelApiType } from "dal/api";
import { AppRootStateType } from "./store";
import { AddTodolistACType, RemoveTodolistACType, SetTodolistsACType } from "./todolistReducer";
import { TasksStateType } from "features/TodolistList/Todolist/Task/Task";
import { appActions, StatusesType } from "app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const tasksInitialState: TasksStateType = {};

const slice = createSlice({
  name: "tasks",
  initialState: tasksInitialState,
  reducers: {
    setTasks(state, action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>) {
      state[action.payload.todolistId] = action.payload.tasks;
    },
    addTask(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task);
    },
    updateTask(state, action: PayloadAction<{ todolistId: string; taskId: string; model: UpdateTaskModelType }>) {
      let tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((todo) => todo.id === action.payload.taskId);
      if (index !== -1) tasks[index] = { ...tasks[index], ...action.payload.model };
    },
    removeTask(state, action: PayloadAction<{ todolistId: string; taskId: string }>) {
      state[action.payload.todolistId] = state[action.payload.todolistId].filter(
        (el) => el.id !== action.payload.taskId
      );
      // let tasksForCurrentTodolist = state[action.payload.todolistId];
      // if (index !== -1) tasksForCurrentTodolist.splice(index, 1);
    },
    removeTasksAfterLogout(state, action: PayloadAction) {
      state = {};
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase();
  // },
});

export const taskReducer = (state = tasksInitialState, action: TasksActionsType): TasksStateType => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      const copyState = { ...state };
      action.payload.todolists.forEach((el) => {
        copyState[el.id] = [];
      });
      return copyState;
    }
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.payload.todolist.id]: [],
      };
    }
    case "REMOVE-TODOLIST": {
      const copyState = { ...state };
      delete copyState[action.payload.todolistId];
      return copyState;
    }
    default:
      return state;
  }
};

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;

//thunks
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  tasksAPI
    .getTasks(todolistId)
    .then((res) => {
      dispatch(tasksActions.setTasks({ todolistId, tasks: res.data.items }));
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch);
    });
};

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setStatus({ status: "loading" }));
  tasksAPI
    .addTask(todolistId, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(tasksActions.addTask({ task: res.data.data.item }));
        dispatch(appActions.setStatus({ status: "idle" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch);
    });
};

export const updateTaskTC =
  (todolistId: string, taskId: string, model: UpdateTaskModelType) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].filter((el) => el.id === taskId)[0];
    const apiModel: UpdateTaskModelApiType = {
      priority: task.priority,
      deadline: task.deadline,
      startDate: task.startDate,
      description: task.description,
      status: task.status,
      title: task.title,
      ...model,
    };
    dispatch(appActions.setStatus({ status: "loading" }));
    dispatch(tasksActions.updateTask({ todolistId, taskId, model: { status: "loading" } }));
    tasksAPI
      .updateTask(todolistId, taskId, { ...apiModel })
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(updateTaskAC(todolistId, taskId, { ...model }));
          dispatch(appActions.setStatus({ status: "idle" }));
          dispatch(changeTaskEntityStatusAC(todolistId, taskId, "idle"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((e) => {
        handleServerNetworkError(e, dispatch);
      });
  };

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setStatus({ status: "loading" }));
  dispatch(changeTaskEntityStatusAC(todolistId, taskId, "loading"));
  tasksAPI
    .removeTask(todolistId, taskId)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(removeTaskAC(todolistId, taskId));
        dispatch(appActions.setStatus({ status: "idle" }));
        dispatch(changeTaskEntityStatusAC(todolistId, taskId, "idle"));
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch);
    });
};

// types
export type UpdateTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

export type TasksActionsType = AddTodolistACType | RemoveTodolistACType | SetTodolistsACType;
