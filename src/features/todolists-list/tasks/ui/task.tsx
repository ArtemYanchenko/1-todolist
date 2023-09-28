import React, { ChangeEvent, FC, memo } from 'react'

import { Delete } from '@mui/icons-material'
import Checkbox from '@mui/material/Checkbox/Checkbox'
import IconButton from '@mui/material/IconButton/IconButton'

import s from './task.module.css'

import { TaskStatuses } from 'common/enums'
import { useAppSelector } from 'common/hooks/hooks'
import { useActions } from 'common/hooks/useActions'
import { EditableSpan } from 'components/editable-span/editable-span'
import { TaskType } from 'features/todolists-list/tasks/api/tasks.api.types'
import { tasksThunks } from 'features/todolists-list/tasks/model/tasks-reducer'

export type Props = {
  todolistId: string
  taskId: string
}

export type TasksStateType = {
  [key: string]: TaskType[]
}

export const Task: FC<Props> = memo(({ todolistId, taskId }) => {
  const task = useAppSelector<TaskType>(
    state => state.tasks[todolistId].filter(el => el.id === taskId)[0]
  )
  const { updateTask, removeTask } = useActions(tasksThunks)

  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New

    updateTask({
      todolistId,
      taskId,
      model: { status },
    })
  }

  const changeTaskTitleHandler = (title: string) => {
    updateTask({ todolistId, taskId, model: { title } })
  }
  const removeTaskHandler = () => {
    removeTask({ todolistId, taskId })
  }

  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ''}>
      <Checkbox
        checked={task.status === TaskStatuses.Completed}
        disabled={task.entityStatus === 'loading'}
        color="success"
        onChange={changeStatusHandler}
      />
      <EditableSpan
        value={task.title}
        onChange={changeTaskTitleHandler}
        disabled={task.entityStatus === 'loading'}
      />
      <IconButton onClick={removeTaskHandler} disabled={task.entityStatus === 'loading'}>
        <Delete />
      </IconButton>
    </div>
  )
})
