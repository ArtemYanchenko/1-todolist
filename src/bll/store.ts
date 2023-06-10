import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from './tasksReducer';
import {todolistReducer} from './todolistReducer';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {appReducer} from './app-reducer';

const rootReducer = combineReducers({
    app:appReducer,
    tasks: tasksReducer,
    todolists: todolistReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppRootStateType = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>

// @ts-ignore
window.store = store;


