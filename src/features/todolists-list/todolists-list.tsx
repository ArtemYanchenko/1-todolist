import React, { memo, useEffect } from 'react'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Navigate } from 'react-router-dom'

import s from './todolists-list.module.css'

import { StatusesType } from 'app/model/app-reducer'
import { useAppSelector } from 'common/hooks/hooks'
import { useActions } from 'common/hooks/useActions'
import { AddItemForm } from 'components/add-item-form/add-item-form'
import { MappedTodolists } from 'features/todolists-list/mapped-todolists/mapped-todolists'
import { isLoggedInSelector } from 'features/todolists-list/todolists-list.selectors'
import { TodolistType } from 'features/todolists-list/todolists/api/todolists.api'
import { todolistsThunks } from 'features/todolists-list/todolists/model/todolist-reducer'

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: StatusesType
}
export const TodolistsList = memo(() => {
  const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector)
  const { addTodolist, getTodolists } = useActions(todolistsThunks)

  const addTodolistCallBack = (title: string) => {
    return addTodolist({ title }).unwrap()
  }

  useEffect(() => {
    if (isLoggedIn) {
      getTodolists({})
    }
  }, [])

  if (!isLoggedIn) return <Navigate to={'/login'} />

  return (
    <Container fixed>
      <Grid container className={s.gridWrapper}>
        <AddItemForm addItem={addTodolistCallBack} />
      </Grid>
      <Grid container spacing={3}>
        <MappedTodolists />
      </Grid>
    </Container>
  )
})
