import {TasksStateType} from '../App';
import {v1} from 'uuid';

type ActionsType = AddTaskACType | RemoveTaskACType

export const tasksReducer = (state: TasksStateType, action: ActionsType):TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK':{
           const task = {id: v1(), title: action.payload.title, isDone: false};
           return {...state,[action.payload.todolistId]:[task,...state[action.payload.todolistId]]}
        }
        case 'REMOVE-TASK': {
            return {...state,[action.payload.todolistId]:state[action.payload.todolistId].filter(el=>el.id !== action.payload.taskId)}
        }
        default:
          return state
    }
}


type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string,title:string) => {
    return {
        type: 'ADD-TASK',
        payload:{
            todolistId,
            title
        }
    } as const
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId:string,taskId:string) => {
    return {
        type: 'REMOVE-TASK',
        payload:{
            todolistId,
            taskId
        }
    } as const
}