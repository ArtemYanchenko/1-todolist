import { ResponseType } from 'common/types'
import { instance } from 'features/todolists-list/tasks/api/tasks.api'

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistType[]>('/todo-lists')
  },
  addTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists', { title })
  },
  changeTodolistTitle(id: string, title: string) {
    return instance.put<ResponseType>(`/todo-lists/${id}`, { title })
  },
  removeTodolist(id: string) {
    return instance.delete<ResponseType>(`/todo-lists/${id}`)
  },
}
