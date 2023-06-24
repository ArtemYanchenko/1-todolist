import { AppThunkType } from "../bll/store";
import { authAPI } from "../dal/api";
import { toggleLogin } from "../bll/authReducer";

const initialState: AppInitialStateType = {
  status: "idle",
  error: null,
  isInitialized: false,
};

export const appReducer = (state = initialState, action: AppActionType) => {
  switch (action.type) {
    case "APP/SET-STATUS": {
      return { ...state, status: action.status };
    }
    case "APP/SET-ERROR": {
      return { ...state, error: action.error };
    }
    case "APP/SET-IS-INITIALIZED": {
      return { ...state, isInitialized: action.value };
    }

    default: {
      return state;
    }
  }
};

//actions
export const setStatusAC = (status: StatusesType) => ({ type: "APP/SET-STATUS", status } as const);
export const setErrorAC = (error: string | null) => ({ type: "APP/SET-ERROR", error } as const);
export const setIsInitializedAC = (value: boolean) => ({ type: "APP/SET-IS-INITIALIZED", value } as const);

//thunks
export const initializeAppTC = (): AppThunkType => (dispatch) => {
  authAPI
    .authMe()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(toggleLogin(true));
      }
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true));
    });
};

//types
export type SetStatusACType = ReturnType<typeof setStatusAC>;
export type SetErrorACType = ReturnType<typeof setErrorAC>;
export type SetIsInitializedACType = ReturnType<typeof setIsInitializedAC>;
type AppActionType = SetStatusACType | SetErrorACType | SetIsInitializedACType;
export type StatusesType = "idle" | "loading" | "succeeded" | "failed";
export type AppInitialStateType = {
  status: StatusesType;
  error: string | null;
  isInitialized: boolean;
};
