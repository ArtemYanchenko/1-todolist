import { authAPI } from "common/dal/api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { authActions } from "common/bll/authReducer";

const appInitialState = {
  status: "idle" as StatusesType,
  error: null as string | null,
  isInitialized: false as boolean,
};

const slice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    setStatus(state, action: PayloadAction<{ status: StatusesType }>) {
      state.status = action.payload.status;
    },
    setError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized;
    },
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
export const appThunks = {};
//thunks
export const initializeApp = () => (dispatch: Dispatch) => {
  authAPI
    .authMe()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
      }
    })
    .finally(() => {
      dispatch(appActions.setIsInitialized({ isInitialized: true }));
    });
};

//types
export type StatusesType = "idle" | "loading" | "succeeded" | "failed";
export type AppInitialStateType = typeof appInitialState;
