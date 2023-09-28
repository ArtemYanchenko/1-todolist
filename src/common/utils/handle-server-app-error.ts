import { Dispatch } from 'redux'

import { appActions } from 'app/model/app-reducer'
import { ResponseType } from 'common/types'

/**
 Handles server-side errors by dispatching actions to update the app error and status states.
 @template T - The type of the server response data.
 @param {ResponseType<T>} data - The response data from the server.
 @param {Dispatch} dispatch - The dispatch function from the Redux store.
 @param {boolean} showError - Determines whether to show the error message to the user. Default is true.
 */

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch,
  showError: boolean = true
) => {
  if (showError) {
    dispatch(
      appActions.setError({
        error: data.messages.length ? data.messages[0] : 'Some error occurred',
      })
    )
  }
}
