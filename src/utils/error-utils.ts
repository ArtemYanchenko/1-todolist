import { Dispatch } from "redux";
import { ResponseType } from "dal/api";
import { appActions } from "app/app-reducer";

export const handleServerAppError = (data: ResponseType, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appActions.setError({ error: data.messages[0] }));
  } else {
    dispatch(appActions.setError({ error: "Some error occurred" }));
  }
  dispatch(appActions.setStatus({ status: "failed" }));
};

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(appActions.setStatus({ status: "failed" }));
  dispatch(appActions.setError({ error: error.message ? error.message : "Some occurred error" }));
};
