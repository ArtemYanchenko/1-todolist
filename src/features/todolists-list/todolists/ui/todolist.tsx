import React, { FC, memo } from "react";
import { AddItemForm } from "components/AddItemForm/AddItemForm";
import { tasksThunks } from "features/todolists-list/task/model/tasks-reducer";
import { todolistsActions, todolistsThunks } from "features/todolists-list/todolists/model/todolist-reducer";
import { useAppSelector } from "common/hooks/hooks";
import { FilterValuesType } from "features/todolists-list/todolists-list";
import { StatusesType } from "app/appReducer";
import { useActions } from "common/hooks/useActions";
import { TaskStatuses, TaskType } from "features/todolists-list/task/api/tasks.api.types";
import { FilterTasksButtons } from "features/todolists-list/todolists/ui/filter-tasks-buttons/filter-tasks-buttons";
import Tasks from "features/todolists-list/todolists/ui/tasks/tasks";
import TodolistTitle from "features/todolists-list/todolists/ui/todolist-title/todolist-title";

type Props = {
  todolistId: string;
  entityStatus: StatusesType;
  filter: FilterValuesType;
};

export const Todolist: FC<Props> = memo(({ todolistId, entityStatus, filter }) => {
  const tasks = useAppSelector((state) => state.tasks[todolistId]);

  const { addTask } = useActions({ ...tasksThunks, ...todolistsThunks, ...todolistsActions });

  const addTaskCallBack = (title: string) => {
    addTask({ todolistId, title });
  };

  const filteredTasks = (): TaskType[] => {
    if (filter === "active") {
      return tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (filter === "completed") {
      return tasks.filter((t) => t.status === TaskStatuses.Completed);
    }
    return tasks;
  };

  let allTodolistTasks = filteredTasks();

  return (
    <div>
      <TodolistTitle todolistId={todolistId} entityStatus={entityStatus} />
      <AddItemForm addItem={addTaskCallBack} disabled={entityStatus === "loading"} />
      <Tasks tasks={allTodolistTasks} todolistId={todolistId} />
      <FilterTasksButtons filter={filter} todolistId={todolistId} />
    </div>
  );
});
