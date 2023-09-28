import React, { useEffect } from 'react'

import { CircularProgress } from '@mui/material'

import { AppRoutes } from 'app/ui/app-routes'
import s from 'app/ui/app.module.css'
import { useAppSelector } from 'common/hooks/hooks'
import { useActions } from 'common/hooks/useActions'
import { Header } from 'components/header/header'
import { Snackbars } from 'components/snack-bar/snack-bar'
import { authThunks } from 'features/auth/auth-reducer'

export function App() {
  const isInitialized = useAppSelector(state => state.app.isInitialized)
  const { initializeApp } = useActions(authThunks)

  useEffect(() => {
    initializeApp({})
  }, [])

  if (!isInitialized)
    return (
      <div className={s.circularProgressWrapper}>
        <CircularProgress />
      </div>
    )

  return (
    <div className="App">
      <Header />
      <AppRoutes />
      <Snackbars />
    </div>
  )
}
