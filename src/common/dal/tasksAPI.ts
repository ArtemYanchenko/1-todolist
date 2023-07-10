import axios from "axios";
import { AddTaskArgType, UpdateTaskModelType } from "common/bll/tasksReducer";
import { StatusesType } from "app/appReducer";
import { ResponseType } from "common/types";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
});

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
  entityStatus: StatusesType;
};

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

// export type ResponseType<D = {}> = {
//   resultCode: number;
//   messages: string[];
//   data: D;
// };

type GetTaskResponseType = {
  items: TaskType[];
  totalCount: number;
  error: string;
};

export type UpdateTaskModelApiType = {
  deadline: string;
  description: string;
  priority: TaskPriorities;
  startDate: string;
  status: TaskStatuses;
  title: string;
};

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

export const tasksAPI = {
  getTasks(id: string) {
    return instance.get<GetTaskResponseType>(`/todo-lists/${id}/tasks`);
  },
  addTask(arg: AddTaskArgType) {
    return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${arg.todolistId}/tasks`, { title: arg.title });
  },
  updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<TaskType>>(`/todo-lists/${todoListId}/tasks/${taskId}`, model);
  },
  removeTask(todoListId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`);
  },
};
