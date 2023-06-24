import { todolistsAPI, TodolistType } from "dal/api";
import { Dispatch } from "redux";
import { FilterValuesType, TodolistDomainType } from "features/TodolistList/TodolistsList";
import { appActions, StatusesType } from "app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { getTasksTC } from "./tasksReducer";
import { AppThunkType } from "./store";

const initialState: TodolistDomainType[] = [];

export const todolistReducer = (state = initialState, action: TodolistsActionsType): TodolistDomainType[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.payload.todolists.map((el) => ({ ...el, filter: "all", entityStatus: "idle" }));
    }
    case "ADD-TODOLIST": {
      const newTodo: TodolistDomainType = { ...action.payload.todolist, filter: "all", entityStatus: "idle" };
      return [newTodo, ...state];
    }
    case "CHANGE-FILTER-TODOLIST": {
      return state.map((el) =>
        el.id === action.payload.todolistId
          ? {
              ...el,
              filter: action.payload.valueFilter,
            }
          : el
      );
    }
    case "CHANGE-TITLE-TODOLIST": {
      return state.map((el) => (el.id === action.payload.todolistId ? { ...el, title: action.payload.title } : el));
    }
    case "REMOVE-TODOLIST": {
      return state.filter((el) => el.id !== action.payload.todolistId);
    }
    case "CHANGE-TODOLIST-ENTITY-STATUS": {
      return state.map((el) => (el.id === action.id ? { ...el, entityStatus: action.status } : el));
    }
    case "REMOVE-TODO-AFTER-LOGOUT": {
      return [];
    }
    default:
      return state;
  }
};

//actions
export const addTodolistAC = (todolist: TodolistType) =>
  ({
    type: "ADD-TODOLIST",
    payload: {
      todolist,
    },
  } as const);

export const changeFilterAC = (todolistId: string, valueFilter: FilterValuesType) =>
  ({
    type: "CHANGE-FILTER-TODOLIST",
    payload: {
      todolistId,
      valueFilter,
    },
  } as const);

export const changeTodolistTitleAC = (todolistId: string, title: string) =>
  ({
    type: "CHANGE-TITLE-TODOLIST",
    payload: {
      todolistId,
      title,
    },
  } as const);

export const removeTodolistAC = (todolistId: string) =>
  ({
    type: "REMOVE-TODOLIST",
    payload: {
      todolistId,
    },
  } as const);

export const setTodolistsAC = (todolists: TodolistType[]) =>
  ({
    type: "SET-TODOLISTS",
    payload: {
      todolists,
    },
  } as const);

export const changeTodolistEntityStatusAC = (id: string, status: StatusesType) =>
  ({ type: "CHANGE-TODOLIST-ENTITY-STATUS", id, status } as const);

export const removeTodoAfterLogout = () => ({ type: "REMOVE-TODO-AFTER-LOGOUT" } as const);

//thunks
export const getTodolistsTC = (): AppThunkType => (dispatch) => {
  dispatch(appActions.setStatus({ status: "loading" }));
  todolistsAPI
    .getTodolists()
    .then((res) => {
      dispatch(setTodolistsAC(res.data));
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
