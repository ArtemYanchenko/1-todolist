import { Dispatch } from "redux";
import { appActions } from "app/appReducer";
import axios, { AxiosError } from "axios";

/**
 *
 * @param e
 * @param dispatch
 */

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
  const err = e as Error | AxiosError<{ error: string }>;
  if (axios.isAxiosError(err)) {
    const error = err.message ? err.message : "Some error occurred";
    dispatch(appActions.setError({ error }));
  } else {
    dispatch(appActions.setError({ error: `Native error ${err.message}` }));
  }
  dispatch(appActions.setStatus({ status: "failed" }));
};
