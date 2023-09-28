import React, { FC, memo } from 'react'

import { StatusesType } from 'app/model/app-reducer'
import { useActions } from 'common/hooks/useActions'
import { AddItemForm } from 'components/add-item-form/add-item-form'
import { tasksThunks } from 'features/todolists-list/tasks/model/tasks-reducer'
import { FilterValuesType } from 'features/todolists-list/todolists-list'
import {
  todolistsActions,
  todolistsThunks,
} from 'features/todolists-list/todolists/model/todolist-reducer'
import { FilterTasksButtons } from 'features/todolists-list/todolists/ui/filter-tasks-buttons/filter-tasks-buttons'
import { Tasks } from 'features/todolists-list/todolists/ui/tasks/tasks'
import TodolistTitle from 'features/todolists-list/todolists/ui/todolist-title/todolist-title'

type Props = {
  todolistId: string
  entityStatus: StatusesType
  filter: FilterValuesType
}

export const Todolist: FC<Props> = memo(({ todolistId, entityStatus, filter }) => {
  const { addTask } = useActions({ ...tasksThunks, ...todolistsThunks, ...todolistsActions })

  const addTaskCallBack = (title: string) => {
    return addTask({ todolistId, title }).unwrap()
  }

  return (
    <div>
      <TodolistTitle todolistId={todolistId} entityStatus={entityStatus} />
      <AddItemForm addItem={addTaskCallBack} disabled={entityStatus === 'loading'} />
      <Tasks todolistId={todolistId} filter={filter} />
      <FilterTasksButtons filter={filter} todolistId={todolistId} />
    </div>
  )
})
