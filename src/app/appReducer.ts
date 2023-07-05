import { authAPI } from "common/dal/api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authActions } from "common/bll/authReducer";
import { createAppAsyncThunk } from "common/utils";

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

const initializeApp = createAppAsyncThunk("app/initializeApp", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setIsInitialized({ isInitialized: true }));
  try {
    const res = await authAPI.authMe();
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
    }
  } catch (e: unknown) {
    return rejectWithValue(null);
  }
});

//thunks
// export const initializeApp_ = () => (dispatch: Dispatch) => {
//   authAPI
//     .authMe()
//     .then((res) => {
//       if (res.data.resultCode === 0) {
//         dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
//       }
//     })
//     .finally(() => {
//       dispatch(appActions.setIsInitialized({ isInitialized: true }));
//     });
// };

export const appReducer = slice.reducer;
export const appActions = slice.actions;
export const appThunks = { initializeApp };

//types
export type StatusesType = "idle" | "loading" | "succeeded" | "failed";
export type AppInitialStateType = typeof appInitialState;
