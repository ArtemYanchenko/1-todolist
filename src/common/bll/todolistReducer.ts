import { todolistsAPI, TodolistType } from "common/dal/api";
import { Dispatch } from "redux";
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
    changeTitleTodolist(state, action: PayloadAction<{ todolistId: string; title: string }>) {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
      if (index !== -1) state[index].title = action.payload.title;
    },
    removeTodolist(state, action: PayloadAction<{ todolistId: string }>) {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
      if (index !== -1) state.splice(index, 1);
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

// const changeTodolistTitle = createAppAsyncThunk('todolists/changeTodolistTitle', async (arg:{todolistId: string, newTitle: string}, thunkAPI)=>{
//   const {} = thunkAPI
//   dispatch(appActions.setStatus({ status: "loading" }));
//   todolistsAPI
//     .changeTodolistTitle(todolistId, newTitle)
//     .then((res) => {
//       if (res.data.resultCode === 0) {
//         dispatch(todolistsActions.changeTitleTodolist({ todolistId, title: newTitle }));
//         dispatch(appActions.setStatus({ status: "idle" }));
//       } else {
//         handleServerAppError(res.data, dispatch);
//       }
//     })
//     .catch((e) => {
//       handleServerNetworkError(e, dispatch);
//     });  dispatch(appActions.setStatus({ status: "loading" }));
//   todolistsAPI
//     .changeTodolistTitle(todolistId, newTitle)
//     .then((res) => {
//       if (res.data.resultCode === 0) {
//         dispatch(todolistsActions.changeTitleTodolist({ todolistId, title: newTitle }));
//         dispatch(appActions.setStatus({ status: "idle" }));
//       } else {
//         handleServerAppError(res.data, dispatch);
//       }
//     })
//     .catch((e) => {
//       handleServerNetworkError(e, dispatch);
//     });
// })

const changeTodolistTitle = (todolistId: string, newTitle: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setStatus({ status: "loading" }));
  todolistsAPI
    .changeTodolistTitle(todolistId, newTitle)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(todolistsActions.changeTitleTodolist({ todolistId, title: newTitle }));
        dispatch(appActions.setStatus({ status: "idle" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch);
    });
};
const removeTodolist = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setStatus({ status: "loading" }));
  dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, entityStatus: "loading" }));
  todolistsAPI
    .removeTodolist(todolistId)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(todolistsActions.removeTodolist({ todolistId }));
        dispatch(appActions.setStatus({ status: "idle" }));
        dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, entityStatus: "idle" }));
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch);
    });
};

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = { getTodolists, addTodolist, changeTodolistTitle, removeTodolist };
