export type StatusesType = 'idle' |  'loading' | 'succeeded' | 'failed'
export type AppInitialStateType = {
    status: StatusesType,
    error: string | null
}
const initialState: AppInitialStateType = {
    status: 'idle',
    error:null
}

type AppActionType = SetStatusACType | SetErrorACType
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


export type SetStatusACType = ReturnType<typeof setStatusAC>;
export const setStatusAC = (status: StatusesType) => ({type: 'APP/SET-STATUS', status} as const)

export type SetErrorACType = ReturnType<typeof setErrorAC>
export const setErrorAC = (error:string | null) => ({type:'APP/SET-ERROR',error} as const)