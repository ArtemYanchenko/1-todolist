import React, { FC } from "react";
import Task from "features/todolists-list/tasks/ui/task";
import { FilterValuesType } from "features/todolists-list/todolists-list";
import { useAppSelector } from "common/hooks/hooks";
import { TaskStatuses } from "features/todolists-list/tasks/api/tasks.api.types";

type Props = {
  todolistId: string;
  filter: FilterValuesType;
};

const Tasks: FC<Props> = ({ todolistId, filter }) => {
  const tasks = useAppSelector((state) => state.tasks[todolistId]);

  let filteredTask = tasks;

  if (filter === "active") {
    filteredTask = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (filter === "completed") {
    filteredTask = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      {filteredTask.map((t) => (
        <Task todolistId={todolistId} taskId={t.id} key={t.id} />
      ))}
    </div>
  );
};

export default Tasks;
