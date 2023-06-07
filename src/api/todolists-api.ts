import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true
})

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

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('/todo-lists')
    },
    createTodolist() {
        return instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists', {title: 'newTodo'})
    },
    updateTitleTodo(id: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${id}`, {title})
    },
    deleteTodo(id: string) {
        return instance.delete<ResponseType>(`/todo-lists/${id}`)
    },
    getTasks(id: string) {
        return instance.get<GetTaskResponseType>(`/todo-lists/${id}/tasks`)
    },
    createTask(id: string, title: string) {
        return instance.post<ResponseType<TaskType>>(`/todo-lists/${id}/tasks`, {title})
    },
    updateTask(todoListId: string, taskId: string) {
        return instance.put<ResponseType<TaskType>>(`/todo-lists/${todoListId}/tasks/${taskId}`, {
            deadline: '',
            description: '',
            completed: true,
            priority: 1,
            startDate: '',
            status: 0,
            title: '2H12ee12e12e12e12ELLOWORqweLD'
        })
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    }
}