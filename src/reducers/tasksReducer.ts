import {AddTodolistACType, RemoveTodolistACType, SetTodolistsACType} from './todolistReducer';
import {TasksStateType} from '../App';
import {Dispatch} from 'redux';
import {tasksAPI, TaskType, UpdateTaskModel} from '../api/api';
import {AppRootStateType} from './store';

export type TasksActionsType =
    | AddTaskACType
    | RemoveTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType
    | SetTodolistsACType
    | SetTasksACType


const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS': {
            return {...state, [action.payload.todolistId]: action.payload.tasks}

        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
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
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        }
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.payload.todolists.forEach(el => {
                copyState[el.id] = []
            })
            return copyState
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
        default:
            return state
    }
}


type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            task
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


export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then(res => dispatch(setTasksAC(todolistId, res.data.items)))
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.addTask(todolistId, title)
        .then((res) => dispatch(addTaskAC(res.data.data.item)))
}

export const changeTaskTitleTC = (todolistId:string,taskId:string,task:TaskType,newTitle:string) => (dispatch:Dispatch,getState:()=>AppRootStateType) => {
    const task = getState().tasks[todolistId].filter(el=>el.id === taskId)[0]
    const model:UpdateTaskModel = {
        description:task.description,
        deadline:task.deadline,
        priority:task.priority,
        completed:task.completed,
        status:task.status,
        startDate:task.startDate,
        title:newTitle
    }
    tasksAPI.updateTask(todolistId,taskId,model)
        .then((res)=>dispatch(changeTaskTitleAC(todolistId,taskId,newTitle)))
}

export const changeTaskCompletedTC = (todolistId:string, taskId:string, newStatus:boolean) => (dispatch:Dispatch, getState:()=>AppRootStateType) => {
    const task = getState().tasks[todolistId].filter(el=>el.id === taskId)[0]
    const model:UpdateTaskModel = {
        description:task.description,
        deadline:task.deadline,
        priority:task.priority,
        status:task.status,
        startDate:task.startDate,
        title:task.title,
        completed:newStatus
    }
    tasksAPI.updateTask(todolistId,taskId,model)
        .then((res)=>dispatch(changeTaskStatusAC(todolistId,taskId,newStatus)))
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.removeTask(todolistId, taskId)
        .then(res => dispatch(removeTaskAC(todolistId, taskId)))
}