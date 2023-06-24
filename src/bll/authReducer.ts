import { AppThunkType } from "./store";
import { authAPI, LoginParamsType } from "../dal/api";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";

const initialState = {
  isLoggedIn: false,
};

type InitialStateType = typeof initialState;

export const authReducer = (state = initialState, action: ToggleLoginType): InitialStateType => {
  switch (action.type) {
    case "TOGGLE-LOGIN": {
      return { ...state, isLoggedIn: action.value };
    }
    default:
      return state;
  }
};

export type ToggleLoginType = ReturnType<typeof toggleLogin>;
export const toggleLogin = (value: boolean) => ({ type: "TOGGLE-LOGIN", value } as const);

export const loginTC =
  (data: LoginParamsType): AppThunkType =>
  (dispatch) => {
    authAPI
      .login(data)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(toggleLogin(true));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((e) => handleServerNetworkError(e, dispatch));
  };
