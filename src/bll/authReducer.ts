import { AppThunkType } from "./store";
import { authAPI, LoginParamsType } from "dal/api";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { removeTodoAfterLogout } from "./todolistReducer";
import { removeTasksAfterLogout } from "./tasksReducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authInitialState = {
  isLoggedIn: false,
};

// type InitialStateType = typeof authInitialState;

const slice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;

export const loginTC =
  (data: LoginParamsType): AppThunkType =>
  (dispatch) => {
    authAPI
      .login(data)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((e) => handleServerNetworkError(e, dispatch));
  };

export const logoutTC = (): AppThunkType => (dispatch) => {
  authAPI.logout().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
      dispatch(removeTodoAfterLogout());
      dispatch(removeTasksAfterLogout());
    }
  });
};
