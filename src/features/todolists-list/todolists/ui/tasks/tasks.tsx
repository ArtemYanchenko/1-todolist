import React, { FC } from "react";
import Task from "features/todolists-list/task/ui/task";
import { TaskType } from "features/todolists-list/task/api/tasks.api.types";

type Props = {
  tasks: TaskType[];
  todolistId: string;
};

const Tasks: FC<Props> = ({ tasks, todolistId }) => {
  return (
    <div>
      {tasks.map((t) => (
        <Task todolistId={todolistId} taskId={t.id} />
      ))}
    </div>
  );
};

export default Tasks;
