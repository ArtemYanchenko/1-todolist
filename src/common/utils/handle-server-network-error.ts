import { appActions } from "app/appReducer";
import axios, { AxiosError } from "axios";
import { AppDispatch } from "common/bll/store";

/**
 Handles network errors by dispatching actions to update the app error state.
 @param {unknown} error - The error object.
 @param {Dispatch} dispatch - The dispatch function from the Redux store.
 */

export const handleServerNetworkError = (e: unknown, dispatch: AppDispatch) => {
  const err = e as Error | AxiosError<{ error: string }>;
  if (axios.isAxiosError(err)) {
    const error = err.message ? err.message : "Some error occurred";
    dispatch(appActions.setError({ error }));
  } else {
    dispatch(appActions.setError({ error: `Native error ${err.message}` }));
  }
  // dispatch(appActions.setStatus({ status: "failed" }));
};
