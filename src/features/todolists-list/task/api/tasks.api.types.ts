import { StatusesType } from "app/appReducer";

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

export type GetTaskResponseType = {
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
