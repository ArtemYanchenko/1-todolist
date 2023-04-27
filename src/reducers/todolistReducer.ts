import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';

type ActionsType = AddTodolistACType | ChangeFilterACType | ChangeTodolistTitleACType | RemoveTodolistACType

export const todolistReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return [...state, {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}]
        }
        case 'CHANGE-FILTER-TODOLIST': {
            return state.map(el => el.id === action.payload.todolistId ? {
                ...el,
                filter: action.payload.valueFilter
            } : el)
        }
        case 'CHANGE-TITLE-TODOLIST': {
            return state.map(el=>el.id === action.payload.todolistId ? {...el,title:action.payload.title} : el)
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todolistId)
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


