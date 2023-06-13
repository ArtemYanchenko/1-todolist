import {Dispatch} from 'redux';
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelApiType} from '../dal/api';
import {AppRootStateType} from './store';
import {AddTodolistACType, RemoveTodolistACType, SetTodolistsACType} from './todolistReducer';
import {TasksStateType} from '../features/TodolistList/Todolist/Task/Task';
import {setStatusAC, SetStatusACType} from '../app/app-reducer';

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
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(el => el.id === action.payload.id ?
                        {...el, ...action.payload.model} : el)
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


//actions
export const addTaskAC = (task: TaskType) =>
    ({
        type: 'ADD-TASK',
        payload: {
            task
        }
    } as const)
export const removeTaskAC = (todolistId: string, taskId: string) =>
    ({
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            taskId
        }
    } as const)
export const updateTaskAC = (todolistId: string, id: string, model: UpdateTaskModelType) =>
    ({
        type: 'UPDATE-TASK',
        payload: {
            todolistId,
            id,
            model
        }
    } as const)
export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
    ({
        type: 'SET-TASKS',
        payload: {
            todolistId,
            tasks
        }
    } as const)


//thunks
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch<TasksActionsType>) => {
    tasksAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<TasksActionsType>) => {
    dispatch(setStatusAC('loading'));
    tasksAPI.addTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(setStatusAC('idle'));
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateTaskModelType) => (dispatch: Dispatch<TasksActionsType>, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].filter(el => el.id === taskId)[0]
    const apiModel: UpdateTaskModelApiType = {
        priority: task.priority,
        deadline: task.deadline,
        startDate: task.startDate,
        description: task.description,
        status: task.status,
        title: task.title,
        ...model
    };
    dispatch(setStatusAC('loading'));
    tasksAPI.updateTask(todolistId, taskId, {...apiModel})
        .then((res) => {
            dispatch(updateTaskAC(todolistId, taskId, {...model}))
            dispatch(setStatusAC('idle'));
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<TasksActionsType>) => {
    dispatch(setStatusAC('loading'));
    tasksAPI.removeTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(todolistId, taskId))
            dispatch(setStatusAC('idle'));
        })
}


// types
export type SetTasksACType = ReturnType<typeof setTasksAC>
export type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type TasksActionsType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistACType
    | RemoveTodolistACType
    | SetTodolistsACType
    | SetTasksACType
|   SetStatusACType

