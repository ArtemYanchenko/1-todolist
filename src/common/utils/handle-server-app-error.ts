import { ResponseType } from "common/dal/api";
import { Dispatch } from "redux";
import { appActions } from "app/app-reducer";

export const handleServerAppError = (data: ResponseType, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appActions.setError({ error: data.messages[0] }));
  } else {
    dispatch(appActions.setError({ error: "Some error occurred" }));
  }
  dispatch(appActions.setStatus({ status: "failed" }));
};
