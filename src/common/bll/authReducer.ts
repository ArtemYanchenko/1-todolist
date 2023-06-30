import { AppThunkType } from "common/bll/store";
import { authAPI, LoginParamsType } from "common/dal/api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tasksActions } from "common/bll/tasksReducer";
import { todolistsActions } from "common/bll/todolistReducer";
import { handleServerAppError, handleServerNetworkError } from "common/utils";

const authInitialState = {
  isLoggedIn: false,
};

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
      dispatch(todolistsActions.removeTodolistsAfterLogout());
      dispatch(tasksActions.removeTasksAfterLogout());
    }
  });
};
