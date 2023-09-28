import axios from 'axios'

import { ResponseType } from 'common/types'
import { GetTaskResponseType, TaskType } from 'features/todolists-list/tasks/api/tasks.api.types'
import {
  AddTaskArgType,
  UpdateTaskModelType,
} from 'features/todolists-list/tasks/model/tasks-reducer'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  withCredentials: true,
})

export const tasksApi = {
  getTasks(id: string) {
    return instance.get<GetTaskResponseType>(`/todo-lists/${id}/tasks`)
  },
  addTask(arg: AddTaskArgType) {
    return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${arg.todolistId}/tasks`, {
      title: arg.title,
    })
  },
  updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<TaskType>>(`/todo-lists/${todoListId}/tasks/${taskId}`, model)
  },
  removeTask(todoListId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
  },
}
