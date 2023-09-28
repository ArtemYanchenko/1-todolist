import { AppRootStateType } from 'common/bll/store'

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
