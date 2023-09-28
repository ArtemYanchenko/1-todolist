import { configureStore } from '@reduxjs/toolkit'
import { AnyAction, combineReducers } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { appReducer } from 'app/model/app-reducer'
import { authReducer } from 'features/auth/auth-reducer'
import { tasksReducer } from 'features/todolists-list/tasks/model/tasks-reducer'
import { todolistsReducer } from 'features/todolists-list/todolists/model/todolist-reducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  tasks: tasksReducer,
  todolists: todolistsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>
