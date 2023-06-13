
type AppInitialStateType = {
    isLoading:boolean
}
const initialState:AppInitialStateType = {
    isLoading:true,
}

type AppActionType = ToggleLoadingACType
export const appReducer = (state = initialState,action:AppActionType) => {
    switch (action.type) {
        case 'TOGGLE-LOADING': {
           return {...state,isLoading:action.value}
        }
        default:{
            return state
        }
    }
}



type ToggleLoadingACType = ReturnType<typeof toggleLoadingAC>
export const toggleLoadingAC = (value:boolean) => ({type:'TOGGLE-LOADING',value}as const)

