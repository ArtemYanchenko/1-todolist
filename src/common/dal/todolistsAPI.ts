import { instance, TodolistType } from "common/dal/tasksAPI";
import { ResponseType } from "common/types";

export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>("/todo-lists");
  },
  addTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>("/todo-lists", { title });
  },
  changeTodolistTitle(id: string, title: string) {
    return instance.put<ResponseType>(`/todo-lists/${id}`, { title });
  },
  removeTodolist(id: string) {
    return instance.delete<ResponseType>(`/todo-lists/${id}`);
  },
};
