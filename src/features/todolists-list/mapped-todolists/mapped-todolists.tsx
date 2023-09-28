import React from 'react'

import { Paper } from '@mui/material'
import Grid from '@mui/material/Grid'

import { useAppSelector } from 'common/hooks/hooks'
import { TodolistDomainType } from 'features/todolists-list/todolists-list'
import s from 'features/todolists-list/todolists-list.module.css'
import { todolistsSelector } from 'features/todolists-list/todolists-list.selectors'
import { Todolist } from 'features/todolists-list/todolists/ui/todolist'

export const MappedTodolists = () => {
  const todolists = useAppSelector<TodolistDomainType[]>(todolistsSelector)

  return (
    <>
      {todolists.map(tl => {
        return (
          <Grid key={tl.id} item>
            <Paper className={s.paperWrapper}>
              {
                <Todolist
                  key={tl.id}
                  todolistId={tl.id}
                  entityStatus={tl.entityStatus}
                  filter={tl.filter}
                />
              }
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
