import {v1} from 'uuid';
import {AddTodolistACType, RemoveTodolistACType, SetTodolists} from './todolistReducer';
import {TasksStateType} from '../App';
import {Dispatch} from 'redux';
import {TaskType, todolistsApi, TodolistType} from '../api/todolists-api';

export type TasksActionsType =
    | AddTaskACType
    | RemoveTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType
    | SetTodolists
    | SetTasksACType


const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,

                    description: '',
                    completed: false,
                    status: 0,
                    priority: 0,
                    startDate: '',
                    deadline: '',
                    todoListId: action.payload.todolistId,
                    order: 0,
                    addedDate: ''


                }, ...state[action.payload.todolistId]]
            }
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(el => el.id === action.payload.id ?
                        {...el, isDone: action.payload.isDone} : el)
            }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(el => el.id === action.payload.id ?
                        {...el, title: action.payload.newTitle}
                        : el)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state, [action.payload.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.payload.todolistId]
            return copyState
        }
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.payload.todolists.forEach(el => {
                copyState[el.id] = []
            })
            return copyState
        }
        case 'SET-TASKS': {
            return {...state,[action.payload.todolistId]:action.payload.tasks}

        }
        default:
            return state
    }
}


type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            title
        }
    } as const
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            taskId
        }
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, id: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistId,
            id,
            isDone
        }
    } as const
}

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, id: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId,
            id,
            newTitle
        }
    } as const
}


export type SetTasksACType = ReturnType<typeof setTasksAC>
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        payload: {
            todolistId,
            tasks
        }
    } as const
}



export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsApi.getTasks(todolistId)
        .then(res =>dispatch(setTasksAC(todolistId,res.data.items)))
}

export const removeTaskTC = (todolistId:string,taskId:string) => (dispatch:Dispatch) => {
    todolistsApi.deleteTask(todolistId,taskId)
        .then(res=>dispatch(removeTaskAC(todolistId,taskId)))
}