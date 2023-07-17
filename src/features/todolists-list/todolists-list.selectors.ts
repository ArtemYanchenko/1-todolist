import { AppRootStateType } from "common/bll/store";

export const todolistsSelector = (state: AppRootStateType) => state.todolists;
export const isLoggedInSelector = (state: AppRootStateType) => state.auth.isLoggedIn;
