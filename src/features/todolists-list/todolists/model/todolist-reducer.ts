import { FilterValuesType, TodolistDomainType } from "features/todolists-list/todolists-list";
import { appActions, StatusesType } from "app/appReducer";
import { tasksThunks } from "features/todolists-list/tasks/model/tasks-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk, handleServerAppError, thunkTryCatch } from "common/utils";
import { todolistsApi, TodolistType } from "features/todolists-list/todolists/api/todolists.api";

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
  const { dispatch } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await todolistsApi.getTodolists();
    await res.data.forEach((tl) => {
      dispatch(tasksThunks.fetchTasks(tl.id));
    });
    return { todolists: res.data };
  });
});

const addTodolist = createAppAsyncThunk("todolists/addTodolist", async (arg: { title: string }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await todolistsApi.addTodolist(arg.title);
    if (res.data.resultCode === 0) {
      return { todolist: res.data.data.item };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  });
});

const changeTodolistTitle = createAppAsyncThunk(
  "todolists/changeTodolistTitle",
  async (
    arg: {
      todolistId: string;
      title: string;
    },
    thunkAPI,
  ) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistsApi.changeTodolistTitle(arg.todolistId, arg.title);
      if (res.data.resultCode === 0) {
        return { todolistId: arg.todolistId, title: arg.title };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    });
  },
);

const removeTodolist = createAppAsyncThunk(
  "todolists/removeTodolist",
  async (
    arg: {
      todolistId: string;
    },
    thunkAPI,
  ) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId: arg.todolistId, entityStatus: "loading" }));
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistsApi.removeTodolist(arg.todolistId);
      dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId: arg.todolistId, entityStatus: "idle" }));
      if (res.data.resultCode === 0) {
        dispatch(appActions.setStatus({ status: "idle" }));
        return { todolistId: arg.todolistId };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    });
  },
);

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = { getTodolists, addTodolist, changeTodolistTitle, removeTodolist };
