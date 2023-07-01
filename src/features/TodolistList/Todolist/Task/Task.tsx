import React, { ChangeEvent, FC, memo, useCallback } from "react";
import { EditableSpan } from "components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import { _removeTask, tasksThunks } from "common/bll/tasksReducer";
import { TaskStatuses, TaskType } from "common/dal/api";
import { useAppDispatch, useAppSelector } from "common/hooks/hooks";
import Checkbox from "@mui/material/Checkbox/Checkbox";

export type PropsType = {
  todoID: string;
  taskID: string;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

export const Task: FC<PropsType> = memo(({ todoID, taskID }) => {
  const task = useAppSelector<TaskType>((state) => state.tasks[todoID].filter((el) => el.id === taskID)[0]);
  const dispatch = useAppDispatch();

  const changeStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        tasksThunks.updateTask({
          todolistId: todoID,
          taskId: taskID,
          model: { status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New },
        })
      );
    },
    [todoID, taskID]
  );

  const changeTaskTitle = useCallback(
    (newTitle: string) => {
      dispatch(tasksThunks.updateTask({ todolistId: todoID, taskId: taskID, model: { title: newTitle } }));
    },
    [todoID, taskID]
  );

  const removeTaskCalllBack = useCallback(() => {
    dispatch(_removeTask(todoID, taskID));
  }, [todoID, taskID]);

  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
      <Checkbox checked={task.status === TaskStatuses.Completed} disabled={task.entityStatus === "loading"} color="success" onChange={changeStatus} />

      <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={task.entityStatus === "loading"} />
      <IconButton onClick={removeTaskCalllBack} disabled={task.entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </div>
  );
});

export default Task;
