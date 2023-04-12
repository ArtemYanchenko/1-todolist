import {TodolistsType} from '../App';

type ActionTypes = AddTodolistACType | ChangeTodolistTitleACType


export const todolistReducer = (state: TodolistsType[], action: ActionTypes) => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistsType = {
                id: action.payload.newID,
                title: action.payload.titleTodo,
                filter: 'all'
            }
            return [newTodolist, ...state];
        }
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.payload.todolistID ? {...el, title: action.payload.newTitle} : el)
        default:
            return state;
    }
}


type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (titleTodo: string, newID: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            titleTodo,
            newID
        }
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistID: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistID,
            newTitle
        }
    } as const
}