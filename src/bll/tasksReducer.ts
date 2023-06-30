import { Dispatch } from "redux";
import { TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelApiType } from "dal/api";
import { AppRootStateType } from "./store";
import { TasksStateType } from "features/TodolistList/Todolist/Task/Task";
import { appActions, StatusesType } from "app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistsActions } from "bll/todolistReducer";

const tasksInitialState: TasksStateType = {};

const slice = createSlice({
  name: "tasks",
  initialState: tasksInitialState,
  reducers: {
    addTask(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task);
    },
    updateTask(state, action: PayloadAction<{ todolistId: string; taskId: string; model: UpdateTaskModelType }>) {
      let tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((todo) => todo.id === action.payload.taskId);
      if (index !== -1) tasks[index] = { ...tasks[index], ...action.payload.model };
    },
    changeTaskEntityStatus(
      state,
      action: PayloadAction<{ todolistId: string; taskId: string; entityStatus: StatusesType }>
    ) {
      let tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((todo) => todo.id === action.payload.taskId);
      if (index !== -1) tasks[index] = { ...tasks[index], entityStatus: action.payload.entityStatus };
    },
    removeTask(state, action: PayloadAction<{ todolistId: string; taskId: string }>) {
      state[action.payload.todolistId] = state[action.payload.todolistId].filter(
        (el) => el.id !== action.payload.taskId
      );
    },
    removeTasksAfterLogout(state) {
      state = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks.map((el) => ({ ...el, entityStatus: "idle" }));
      })
      .addCase(todolistsActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsActions.removeTodolist, (state, action) => {
        delete state[action.payload.todolistId];
      })
      .addCase(todolistsActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((el) => {
          state[el.id] = [];
        });
      });
  },
});

//thunks
export const fetchTasks = createAsyncThunk("tasks/fetchTasksTC", async (todolistId: string, thunkAPI) => {
  const { dispatch } = thunkAPI;
  dispatch(appActions.setStatus({ status: "loading" }));
  const res = await tasksAPI.getTasks(todolistId);
  const tasks = res.data.items;
  dispatch(appActions.setStatus({ status: "succeeded" }));
  // dispatch(tasksActions.setTasks({ todolistId, tasks: tasks }));
  return { tasks, todolistId };
});

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
    dispatch(tasksActions.changeTaskEntityStatus({ todolistId, taskId, entityStatus: "loading" }));
    tasksAPI
      .updateTask(todolistId, taskId, { ...apiModel })
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(tasksActions.updateTask({ todolistId, taskId, model: { ...model } }));
          dispatch(appActions.setStatus({ status: "idle" }));
          dispatch(tasksActions.changeTaskEntityStatus({ todolistId, taskId, entityStatus: "idle" }));
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
  dispatch(tasksActions.changeTaskEntityStatus({ todolistId, taskId, entityStatus: "loading" }));
  tasksAPI
    .removeTask(todolistId, taskId)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(tasksActions.removeTask({ todolistId, taskId }));
        dispatch(appActions.setStatus({ status: "idle" }));
        dispatch(tasksActions.changeTaskEntityStatus({ todolistId, taskId, entityStatus: "idle" }));
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch);
    });
};

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = { fetchTasks };

// types
export type UpdateTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
