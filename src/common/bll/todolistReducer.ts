import { todolistsAPI, TodolistType } from "common/dal/api";
import { FilterValuesType, TodolistDomainType } from "features/TodolistList/TodolistsList";
import { appActions, StatusesType } from "app/appReducer";
import { tasksThunks } from "common/bll/tasksReducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils";

const todolistsInitialState: TodolistDomainType[] = [];

const slice = createSlice({
  name: "todolists",
  initialState: todolistsInitialState,
  reducers: {
    changeFilterTodolist(state, action: PayloadAction<{ todolistId: string; filterValue: FilterValuesType }>) {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
      if (index !== -1) state[index].filter = action.payload.filterValue;
    },
    changeTodolistEntityStatus(state, action: PayloadAction<{ todolistId: string; entityStatus: StatusesType }>) {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
      if (index !== -1) state[index].entityStatus = action.payload.entityStatus;
    },
    removeTodolistsAfterLogout(state) {
      state = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        const newTodo: TodolistDomainType = { ...action.payload.todolist, filter: "all", entityStatus: "idle" };
        state.unshift(newTodo);
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
        if (index !== -1) state[index].title = action.payload.title;
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
        if (index !== -1) state.splice(index, 1);
      });
  },
});

//thunks
const getTodolists = createAppAsyncThunk<{
  todolists: TodolistType[];
}>("todolists/getTodolists", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setStatus({ status: "loading" }));
  try {
    const res = await todolistsAPI.getTodolists();
    await res.data.forEach((tl) => {
      dispatch(tasksThunks.fetchTasks(tl.id));
    });
    dispatch(appActions.setStatus({ status: "idle" }));
    return { todolists: res.data };
  } catch (e: unknown) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

const addTodolist = createAppAsyncThunk("todolists/addTodolist", async (arg: { title: string }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setStatus({ status: "loading" }));
  const res = await todolistsAPI.addTodolist(arg.title);
  try {
    if (res.data.resultCode === 0) {
      dispatch(appActions.setStatus({ status: "idle" }));
      return { todolist: res.data.data.item };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e: unknown) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

const changeTodolistTitle = createAppAsyncThunk(
  "todolists/changeTodolistTitle",
  async (
    arg: {
      todolistId: string;
      title: string;
    },
    thunkAPI
  ) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setStatus({ status: "loading" }));
    const res = await todolistsAPI.changeTodolistTitle(arg.todolistId, arg.title);
    try {
      if (res.data.resultCode === 0) {
        dispatch(appActions.setStatus({ status: "idle" }));
        return { todolistId: arg.todolistId, title: arg.title };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  }
);

const removeTodolist = createAppAsyncThunk(
  "todolists/removeTodolist",
  async (
    arg: {
      todolistId: string;
    },
    thunkAPI
  ) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setStatus({ status: "loading" }));
    dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId: arg.todolistId, entityStatus: "loading" }));
    try {
      const res = await todolistsAPI.removeTodolist(arg.todolistId);
      if (res.data.resultCode === 0) {
        dispatch(appActions.setStatus({ status: "idle" }));
        dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId: arg.todolistId, entityStatus: "idle" }));
        return { todolistId: arg.todolistId };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  }
);

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = { getTodolists, addTodolist, changeTodolistTitle, removeTodolist };
