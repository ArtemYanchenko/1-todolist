import {Dispatch} from 'redux';
import {setErrorAC, setStatusAC} from '../app/app-reducer';
import {ResponseType} from '../dal/api';

export const handleServerAppError = (data:ResponseType,dispatch:Dispatch) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (error:{message:string},dispatch:Dispatch) => {
    dispatch(setStatusAC('failed'))
    dispatch(setErrorAC(error.message ? error.message : 'Some occurred error'))
}