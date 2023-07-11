import React, { FC, memo, useCallback } from "react";
import { AddItemForm } from "components/AddItemForm/AddItemForm";
import { EditableSpan } from "components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import TaskWithRedux from "./Task/Task";
import { tasksThunks } from "common/bll/tasksReducer";
import { todolistsActions, todolistsThunks } from "common/bll/todolistReducer";
import { useAppSelector } from "common/hooks/hooks";
import { FilterValuesType } from "../TodolistsList";
import { StatusesType } from "app/appReducer";
import { TaskStatuses, TaskType } from "common/dal/tasksAPI";
import { useActions } from "common/hooks/useActions";

type PropsType = {
  todolistId: string;
  entityStatus: StatusesType;
  filter: FilterValuesType;
};

export const Todolist: FC<PropsType> = memo(({ todolistId, entityStatus, filter }) => {
  const tasks = useAppSelector((state) => state.tasks[todolistId]);
  const todolists = useAppSelector((state) => state.todolists.find((el) => el.id === todolistId));
  const {
    addTask: addTaskTC,
    changeTodolistTitle: changeTodolistTitleTC,
    removeTodolist: removeTodolistTC,
    changeFilterTodolist,
  } = useActions({ ...tasksThunks, ...todolistsThunks, ...todolistsActions });

  const addTask = useCallback((title: string) => {
    addTaskTC({ todolistId, title });
  }, []);

  const changeTodolistTitle = useCallback((title: string) => {
    changeTodolistTitleTC({ todolistId, title });
  }, []);

  const removeTodolist = useCallback(() => {
    removeTodolistTC({ todolistId });
  }, []);

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
        <EditableSpan value={todolists!.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist} disabled={entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} disabled={entityStatus === "loading"} />
      <div>
        {allTodolistTasks.map((t) => (
          <TaskWithRedux todoID={todolistId} taskID={t.id} />
        ))}
      </div>
      <div style={{ paddingTop: "10px" }}>
        <ButtonWithMemo title={"All"} variant={filter === "all" ? "outlined" : "text"} onClick={() => changeFilterTodolist({ todolistId, filterValue: "all" })} color={"inherit"} />
        <ButtonWithMemo title={"Active"} variant={filter === "active" ? "outlined" : "text"} onClick={() => changeFilterTodolist({ todolistId, filterValue: "active" })} color={"primary"} />
        <ButtonWithMemo title={"Completed"} variant={filter === "completed" ? "outlined" : "text"} onClick={() => changeFilterTodolist({ todolistId, filterValue: "completed" })} color={"secondary"} />
      </div>
    </div>
  );
});

type ButtonWithMemoPropsType = {
  title: string;
  onClick: () => void;
  variant: "text" | "outlined" | "contained";
  color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
};

const ButtonWithMemo = memo((props: ButtonWithMemoPropsType) => {
  return (
    <Button variant={props.variant} onClick={props.onClick} color={props.color}>
      {props.title}
    </Button>
  );
});
