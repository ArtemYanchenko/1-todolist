import {TodolistDomainType} from '../features/TodolistList/TodolistsList';
import {TodolistsActionsType} from './todolistReducer';
const initialState = {
    isLoggin:false
}

type InitialStateType = typeof initialState

export const loginReducer = (state = initialState, action: ToggleLoginType):InitialStateType => {
    switch (action.type) {
        case 'TOGGLE-LOGIN':{
            return {...state,isLoggin: action.value}
        }
        default:
            return state
    }
}

export type ToggleLoginType = ReturnType<typeof toggleLogin>
export const toggleLogin = (value:boolean)=>({type:'TOGGLE-LOGIN',value}as const)

// export const too