import React, { FC, memo } from "react";
import { tasksThunks } from "features/todolists-list/tasks/model/tasks-reducer";
import { todolistsActions, todolistsThunks } from "features/todolists-list/todolists/model/todolist-reducer";
import { useAppSelector } from "common/hooks/hooks";
import { FilterValuesType } from "features/todolists-list/todolists-list";
import { StatusesType } from "app/appReducer";
import { useActions } from "common/hooks/useActions";
import { FilterTasksButtons } from "features/todolists-list/todolists/ui/filter-tasks-buttons/filter-tasks-buttons";
import Tasks from "features/todolists-list/todolists/ui/tasks/tasks";
import { AddItemForm } from "components/add-item-form/add-item-form";
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

  return (
    <div>
      <TodolistTitle todolistId={todolistId} entityStatus={entityStatus} />
      <AddItemForm addItem={addTaskCallBack} disabled={entityStatus === "loading"} />
      <Tasks todolistId={todolistId} filter={filter} />
      <FilterTasksButtons filter={filter} todolistId={todolistId} />
    </div>
  );
});
