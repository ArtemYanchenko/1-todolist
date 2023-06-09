import {todolistsAPI, TodolistType} from '../dal/api';
import {Dispatch} from 'redux';
import {FilterValuesType, TodolistDomainType} from '../features/TodolistList/TodolistsList';


const initialState: TodolistDomainType[] = [];

export const todolistReducer = (state = initialState, action: TodolistsActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.payload.todolists.map(el => ({...el, filter: 'all'}))
        }
        case 'ADD-TODOLIST': {
            const newTodo: TodolistDomainType = {...action.payload.todolist, filter: 'all'}
            return [newTodo, ...state]
        }
        case 'CHANGE-FILTER-TODOLIST': {
            return state.map(el => el.id === action.payload.todolistId ? {
                ...el,
                filter: action.payload.valueFilter
            } : el)
        }
        case 'CHANGE-TITLE-TODOLIST': {
            return state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.title} : el)
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        default:
            return state
    }
}

//actions
export const addTodolistAC = (todolist: TodolistType) =>
    ({
        type: 'ADD-TODOLIST',
        payload: {
            todolist
        }
    } as const)
export const changeFilterAC = (todolistId: string, valueFilter: FilterValuesType) =>
    ({
        type: 'CHANGE-FILTER-TODOLIST',
        payload: {
            todolistId,
            valueFilter
        }
    } as const)
export const changeTodolistTitleAC = (todolistId: string, title: string) =>
    ({
        type: 'CHANGE-TITLE-TODOLIST',
        payload: {
            todolistId,
            title
        }
    } as const)
export const removeTodolistAC = (todolistId: string) =>
    ({
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const)
export const setTodolistsAC = (todolists: TodolistType[]) =>
    ({
        type: 'SET-TODOLISTS',
        payload: {
            todolists
        }
    } as const)


//thunks
export const getTodolistsTC = () => (dispatch: Dispatch<TodolistsActionsType>) => {
    todolistsAPI.getTodolists()
        .then(res => dispatch(setTodolistsAC(res.data)))
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<TodolistsActionsType>) => {
    todolistsAPI.addTodolist(title)
        .then((res) => dispatch(addTodolistAC(res.data.data.item)))
}
export const changeTodolistTitleTC = (todolistId: string, newTitle: string) => (dispatch: Dispatch<TodolistsActionsType>) => {
    todolistsAPI.changeTodolistTitle(todolistId, newTitle)
        .then(() => dispatch(changeTodolistTitleAC(todolistId, newTitle)))
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<TodolistsActionsType>) => {
    todolistsAPI.removeTodolist(todolistId)
        .then((res) => dispatch(removeTodolistAC(todolistId)))
}


//types
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export type TodolistsActionsType =
    | AddTodolistACType
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | RemoveTodolistACType
    | SetTodolistsACType
