import React, { FC } from 'react'

import { TaskStatuses } from 'common/enums'
import { useAppSelector } from 'common/hooks/hooks'
import { Task } from 'features/todolists-list/tasks/ui/task'
import { FilterValuesType } from 'features/todolists-list/todolists-list'

export const Tasks: FC<Props> = ({ todolistId, filter }) => {
  const tasks = useAppSelector(state => state.tasks[todolistId])

  let filteredTask = tasks

  if (filter === 'active') {
    filteredTask = tasks.filter(t => t.status === TaskStatuses.New)
  }
  if (filter === 'completed') {
    filteredTask = tasks.filter(t => t.status === TaskStatuses.Completed)
  }

  return (
    <div>
      {filteredTask.map(t => (
        <Task todolistId={todolistId} taskId={t.id} key={t.id} />
      ))}
    </div>
  )
}

//types
type Props = {
  todolistId: string
  filter: FilterValuesType
}
