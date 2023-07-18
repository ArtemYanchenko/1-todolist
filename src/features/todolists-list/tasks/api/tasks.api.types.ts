import { StatusesType } from "app/model/app-reducer";
import { TaskPriorities, TaskStatuses } from "common/enums";

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
