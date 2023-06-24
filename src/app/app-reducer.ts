import { authAPI } from "dal/api";
import { toggleLogin } from "bll/authReducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

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

// export const appReducer = (state = initialState, action: AppActionType) => {
//   switch (action.type) {
//     case "APP/SET-STATUS": {
//       return { ...state, status: action.status };
//     }
//     case "APP/SET-ERROR": {
//       return { ...state, error: action.error };
//     }
//     case "APP/SET-IS-INITIALIZED": {
//       return { ...state, isInitialized: action.value };
//     }
//
//     default: {
//       return state;
//     }
//   }
// };

// //actions
// export const setStatusAC = (status: StatusesType) => ({ type: "APP/SET-STATUS", status } as const);
// export const setErrorAC = (error: string | null) => ({ type: "APP/SET-ERROR", error } as const);
// export const setIsInitializedAC = (value: boolean) => ({ type: "APP/SET-IS-INITIALIZED", value } as const);

//thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI
    .authMe()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(toggleLogin(true));
      }
    })
    .finally(() => {
      dispatch(appActions.setIsInitialized({ isInitialized: true }));
    });
};

//types
// export type SetStatusACType = ReturnType<typeof setStatusAC>;
// export type SetErrorACType = ReturnType<typeof setErrorAC>;
// export type SetIsInitializedACType = ReturnType<typeof setIsInitializedAC>;
// type AppActionType = SetStatusACType | SetErrorACType | SetIsInitializedACType;
export type StatusesType = "idle" | "loading" | "succeeded" | "failed";
export type AppInitialStateType = typeof appInitialState;
