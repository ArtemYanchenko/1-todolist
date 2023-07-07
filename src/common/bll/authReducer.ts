import { authAPI, LoginParamsType } from "common/dal/api";
import { createSlice } from "@reduxjs/toolkit";
import { tasksActions } from "common/bll/tasksReducer";
import { todolistsActions } from "common/bll/todolistReducer";
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils";
import { appActions } from "app/appReducer";

const authInitialState = {
  isLoggedIn: false,
};

const slice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      });
  },
});

export const login = createAppAsyncThunk<
  {
    isLoggedIn: boolean;
  },
  LoginParamsType
>("auth/login", async (data, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const res = await authAPI.login(data);
    if (res.data.resultCode === 0) {
      return { isLoggedIn: true };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e: unknown) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

export const logout = createAppAsyncThunk<{ isLoggedIn: boolean }>("auth/logout", async (state, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const res = await authAPI.logout();
    if (res.data.resultCode === 0) {
      dispatch(todolistsActions.removeTodolistsAfterLogout());
      dispatch(tasksActions.removeTasksAfterLogout());
      return { isLoggedIn: false };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e: unknown) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

const initializeApp = createAppAsyncThunk<
  {
    isLoggedIn: boolean;
  },
  void
>("auth/initializeApp", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const res = await authAPI.authMe();
    if (res.data.resultCode === 0) {
      return { isLoggedIn: true };
    } else {
      return rejectWithValue(null);
    }
  } catch (e: unknown) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setIsInitialized({ isInitialized: true }));
  }
});

export const authReducer = slice.reducer;
export const authThunks = { login, logout, initializeApp };
