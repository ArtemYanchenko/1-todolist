import React, { FC } from 'react'

import { Delete } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton/IconButton'

import { StatusesType } from 'app/model/app-reducer'
import { useAppSelector } from 'common/hooks/hooks'
import { useActions } from 'common/hooks/useActions'
import { EditableSpan } from 'components/editable-span/editable-span'
import { todolistsThunks } from 'features/todolists-list/todolists/model/todolist-reducer'

type Props = {
  todolistId: string
  entityStatus: StatusesType
}

const TodolistTitle: FC<Props> = ({ todolistId, entityStatus }) => {
  const todolists = useAppSelector(state => state.todolists.find(el => el.id === todolistId))
  const { changeTodolistTitle, removeTodolist } = useActions(todolistsThunks)

  const changeTodolistTitleCallBack = (title: string) => {
    changeTodolistTitle({ todolistId, title })
  }

  const removeTodolistCallBack = () => {
    removeTodolist({ todolistId })
  }

  return (
    <h3>
      <EditableSpan value={todolists!.title} onChange={changeTodolistTitleCallBack} />
      <IconButton onClick={removeTodolistCallBack} disabled={entityStatus === 'loading'}>
        <Delete />
      </IconButton>
    </h3>
  )
}

export default TodolistTitle
