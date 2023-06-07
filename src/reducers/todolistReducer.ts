import {v1} from 'uuid';
import {FilterValuesType, TodolistDomainType} from '../AppWithRedux';
import {todolistsApi, TodolistType} from '../api/todolists-api';
import {Dispatch} from 'redux';

export type TodolistsActionsType =
    AddTodolistACType
    | ChangeFilterACType
    | ChangeTodolistTitleACType
    | RemoveTodolistACType
    | SetTodolists

const initialState: TodolistDomainType[] = [];

export const todolistReducer = (state = initialState, action: TodolistsActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return [
                {
                    id: action.payload.todolistId,
                    title: action.payload.title,
                    order: 0,
                    addedDate: '',
                    filter: 'all'
                }, ...state]
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
        case 'SET-TODOLISTS': {
            return action.payload.todolists.map(el => ({...el, filter: 'all'}))

        }
        default:
            return state
    }
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolistId: v1(),
            title
        }
    } as const
}

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistId: string, valueFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER-TODOLIST',
        payload: {
            todolistId,
            valueFilter
        }
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TITLE-TODOLIST',
        payload: {
            todolistId,
            title
        }
    } as const
}

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export type SetTodolists = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {
            todolists
        }
    } as const
}

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsApi.getTodolists()
            .then(res => dispatch(setTodolistsAC(res.data)))
    }
}
