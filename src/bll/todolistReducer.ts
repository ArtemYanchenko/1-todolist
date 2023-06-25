import { todolistsAPI, TodolistType } from "dal/api";
import { Dispatch } from "redux";
import { FilterValuesType, TodolistDomainType } from "features/TodolistList/TodolistsList";
import { appActions, StatusesType } from "app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { getTasksTC } from "./tasksReducer";
import { AppThunkType } from "./store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const todolistsInitialState: TodolistDomainType[] = [];

const slice = createSlice({
  name: "todolists",
  initialState: todolistsInitialState,
  reducers: {
    setTodolists(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
    },
    addTodolist(state, action: PayloadAction<{ todolist: TodolistType }>) {
      const newTodo: TodolistDomainType = { ...action.payload.todolist, filter: "all", entityStatus: "idle" };
      state.unshift(newTodo);
    },
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
    removeTodolistsAfterLogout(state, action) {
      state = [];
    },
  },
});

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;

//thunks
export const getTodolistsTC = (): AppThunkType => (dispatch) => {
  dispatch(appActions.setStatus({ status: "loading" }));
  todolistsAPI
    .getTodolists()
    .then((res) => {
      dispatch(todolistsActions.setTodolists({ todolists: res.data }));
      dispatch(appActions.setStatus({ status: "idle" }));
      return res.data;
    })
    .then((todos) => {
      todos.forEach((tl) => {
        dispatch(getTasksTC(tl.id));
      });
    })
    .catch((e) => {
      dispatch(appActions.setError({ error: e.message }));
      dispatch(appActions.setStatus({ status: "idle" }));
    });
};

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setStatus({ status: "loading" }));
  todolistsAPI
    .addTodolist(title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(addTodolistAC(res.data.data.item));
        dispatch(appActions.setStatus({ status: "idle" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch);
    });
};
export const changeTodolistTitleTC = (todolistId: string, newTitle: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setStatus({ status: "loading" }));
  todolistsAPI
    .changeTodolistTitle(todolistId, newTitle)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(changeTodolistTitleAC(todolistId, newTitle));
        dispatch(appActions.setStatus({ status: "idle" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch);
    });
};
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setStatus({ status: "loading" }));
  dispatch(changeTodolistEntityStatusAC(todolistId, "loading"));
  todolistsAPI
    .removeTodolist(todolistId)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(removeTodolistAC(todolistId));
        dispatch(appActions.setStatus({ status: "idle" }));
        dispatch(changeTodolistEntityStatusAC(todolistId, "idle"));
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch);
    });
};

//types
export type AddTodolistACType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>;
export type ChangeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>;
export type TodolistsActionsType =
  | AddTodolistACType
  | ReturnType<typeof changeFilterAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | RemoveTodolistACType
  | SetTodolistsACType
  | ChangeTodolistEntityStatusACType
  | ReturnType<typeof removeTodoAfterLogout>;
