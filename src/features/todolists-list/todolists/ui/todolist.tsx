import React, { FC, memo } from "react";
import { AddItemForm } from "components/AddItemForm/AddItemForm";
import { EditableSpan } from "components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import Task from "features/todolists-list/task/ui/task";
import { tasksThunks } from "features/todolists-list/task/model/tasks-reducer";
import { todolistsActions, todolistsThunks } from "features/todolists-list/todolists/model/todolist-reducer";
import { useAppSelector } from "common/hooks/hooks";
import { FilterValuesType } from "features/todolists-list/todolists-list";
import { StatusesType } from "app/appReducer";
import { useActions } from "common/hooks/useActions";
import { TaskStatuses, TaskType } from "features/todolists-list/task/api/tasks.api.types";
import s from "./todolist.module.css";
import { FilterTasksButtons } from "features/todolists-list/todolists/ui/filter-tasks-buttons/filter-tasks-buttons";

type Props = {
  todolistId: string;
  entityStatus: StatusesType;
  filter: FilterValuesType;
};

export const Todolist: FC<Props> = memo(({ todolistId, entityStatus, filter }) => {
  const tasks = useAppSelector((state) => state.tasks[todolistId]);
  const todolists = useAppSelector((state) => state.todolists.find((el) => el.id === todolistId));
  const { addTask, changeTodolistTitle, removeTodolist } = useActions({ ...tasksThunks, ...todolistsThunks, ...todolistsActions });

  const addTaskCallBack = (title: string) => {
    addTask({ todolistId, title });
  };

  const changeTodolistTitleCallBack = (title: string) => {
    changeTodolistTitle({ todolistId, title });
  };

  const removeTodolistCallBack = () => {
    removeTodolist({ todolistId });
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
      <h3>
        <EditableSpan value={todolists!.title} onChange={changeTodolistTitleCallBack} />
        <IconButton onClick={removeTodolistCallBack} disabled={entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskCallBack} disabled={entityStatus === "loading"} />
      <div>
        {allTodolistTasks.map((t) => (
          <Task todolistId={todolistId} taskId={t.id} />
        ))}
      </div>
      <div className={s.buttonWrapper}>
        <FilterTasksButtons filter={filter} todolistId={todolistId} />
      </div>
    </div>
  );
});
