import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnyAction } from "redux";

const appInitialState = {
  status: "idle" as StatusesType,
  error: null as string | null,
  isInitialized: false as boolean,
};

const slice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    setError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action: AnyAction) => {
          return action.type.endsWith("/pending");
        },
        (state) => {
          state.status = "loading";
        },
      )
      .addMatcher(
        (action: AnyAction) => {
          return action.type.endsWith("/rejected");
        },
        (state, action) => {
          state.status = "failed";

          const { payload, error } = action;
          if (payload) {
            if (payload.showGlobalError) {
              state.error = payload.data.messages.length ? payload.data.messages[0] : "Some error occurred";
            }
          } else {
            state.error = error.message ? error.message : "Some error occurred";
          }
        },
      )
      .addMatcher(
        (action: AnyAction) => {
          return action.type.endsWith("/fulfilled");
        },
        (state) => {
          state.status = "idle";
        },
      );
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;

//types
export type StatusesType = "idle" | "loading" | "succeeded" | "failed";
export type AppInitialStateType = typeof appInitialState;
