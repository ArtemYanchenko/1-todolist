const initialState: AppInitialStateType = {
    status: 'idle',
    error:null
}

export const appReducer = (state = initialState, action: AppActionType) => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'APP/SET-ERROR': {
            return {...state,error:action.error}
        }

        default: {
            return state
        }
    }
}


//actions
export const setStatusAC = (status: StatusesType) => ({type: 'APP/SET-STATUS', status} as const)
export const setErrorAC = (error:string | null) => ({type:'APP/SET-ERROR',error} as const)

//types
export type SetStatusACType = ReturnType<typeof setStatusAC>
export type SetErrorACType = ReturnType<typeof setErrorAC>
type AppActionType = SetStatusACType | SetErrorACType
export type StatusesType = 'idle' |  'loading' | 'succeeded' | 'failed'
export type AppInitialStateType = {
    status: StatusesType,
    error: string | null
}