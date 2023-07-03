import { TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelApiType } from "common/dal/api";
import { TasksStateType } from "features/TodolistList/Todolist/Task/Task";
import { appActions, StatusesType } from "app/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistsActions } from "common/bll/todolistReducer";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { handleServerAppError, handleServerNetworkError } from "common/utils";

const tasksInitialState: TasksStateType = {};

const slice = createSlice({
  name: "tasks",
  initialState: tasksInitialState,
  reducers: {
    changeTaskEntityStatus(
      state,
      action: PayloadAction<{
        todolistId: string;
        taskId: string;
        entityStatus: StatusesType;
      }>
    ) {
      let tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((todo) => todo.id === action.payload.taskId);
      if (index !== -1) tasks[index] = { ...tasks[index], entityStatus: action.payload.entityStatus };
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
      .addCase(addTask.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift(action.payload.task);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        let tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((todo) => todo.id === action.payload.taskId);
        if (index !== -1) tasks[index] = { ...tasks[index], ...action.payload.model };
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state[action.payload.todolistId] = state[action.payload.todolistId].filter((el) => el.id !== action.payload.taskId);
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
export const fetchTasks = createAppAsyncThunk<
  {
    tasks: TaskType[];
    todolistId: string;
  },
  string
>("tasks/fetchTasks", async (todolistId, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setStatus({ status: "loading" }));
    const res = await tasksAPI.getTasks(todolistId);
    const tasks = res.data.items;
    dispatch(appActions.setStatus({ status: "succeeded" }));
    return { tasks, todolistId };
  } catch (e: unknown) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

export const addTask = createAppAsyncThunk<
  {
    task: TaskType;
  },
  AddTaskArgType
>("tasks/addTask", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setStatus({ status: "loading" }));
    const res = await tasksAPI.addTask(arg);
    if (res.data.resultCode === 0) {
      const task = res.data.data.item;
      dispatch(appActions.setStatus({ status: "idle" }));
      return { task };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e: unknown) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

export const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>("tasks/updateTask", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue, getState } = thunkAPI;
  const task = getState().tasks[arg.todolistId].filter((el) => el.id === arg.taskId)[0];
  const apiModel: UpdateTaskModelApiType = {
    priority: task.priority,
    deadline: task.deadline,
    startDate: task.startDate,
    description: task.description,
    status: task.status,
    title: task.title,
    ...arg.model,
  };
  dispatch(appActions.setStatus({ status: "loading" }));
  dispatch(
    tasksActions.changeTaskEntityStatus({
      todolistId: arg.todolistId,
      taskId: arg.taskId,
      entityStatus: "loading",
    })
  );
  try {
    const res = await tasksAPI.updateTask(arg.todolistId, arg.taskId, { ...apiModel });
    if (res.data.resultCode === 0) {
      dispatch(appActions.setStatus({ status: "idle" }));
      dispatch(
        tasksActions.changeTaskEntityStatus({
          todolistId: arg.todolistId,
          taskId: arg.taskId,
          entityStatus: "idle",
        })
      );
      return arg;
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e: unknown) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

export const removeTask = createAppAsyncThunk<any, RemoveTaskArgType>("tasks/removeTask", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setStatus({ status: "loading" }));
  dispatch(
    tasksActions.changeTaskEntityStatus({
      todolistId: arg.todolistId,
      taskId: arg.taskId,
      entityStatus: "loading",
    })
  );
  try {
    const res = await tasksAPI.removeTask(arg.todolistId, arg.taskId);
    if (res.data.resultCode === 0) {
      dispatch(appActions.setStatus({ status: "idle" }));
      dispatch(
        tasksActions.changeTaskEntityStatus({
          todolistId: arg.todolistId,
          taskId: arg.taskId,
          entityStatus: "idle",
        })
      );
      return arg;
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e: unknown) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = { fetchTasks, addTask, updateTask, removeTask };

// types
export type UpdateTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

export type AddTaskArgType = {
  todolistId: string;
  title: string;
};

type UpdateTaskArgType = { todolistId: string; taskId: string; model: UpdateTaskModelType };
type RemoveTaskArgType = { todolistId: string; taskId: string };
