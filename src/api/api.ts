import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true
})


enum TaskStatuses {
    New = 0

}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}


type GetTaskResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}

export type UpdateTaskModel = {
    deadline: string
    description: string
    completed: boolean
    priority: number
    startDate: string
    status: number
    title: string
}

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('/todo-lists')
    },
    addTodolist(title:string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists', {title})
    },
    changeTodolistTitle(id: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${id}`, {title})
    },
    removeTodolist(id: string) {
        return instance.delete<ResponseType>(`/todo-lists/${id}`)
    }
}

export const tasksAPI = {
    getTasks(id: string) {
        return instance.get<GetTaskResponseType>(`/todo-lists/${id}/tasks`)
    },
    addTask(id: string, title: string) {
        return instance.post<ResponseType<{ item:TaskType }>>(`/todo-lists/${id}/tasks`, {title})
    },
    updateTask(todoListId: string, taskId: string, model:UpdateTaskModel) {
        return instance.put<ResponseType<TaskType>>(`/todo-lists/${todoListId}/tasks/${taskId}`, model)
    },
    removeTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    }
}