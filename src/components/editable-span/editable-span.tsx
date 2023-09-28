import React, { ChangeEvent, FC, memo, useState } from 'react'

import TextField from '@mui/material/TextField/TextField'

type Props = {
  value: string
  onChange: (newValue: string) => void
  disabled?: boolean
}

export const EditableSpan: FC<Props> = memo(({ value, onChange, disabled }) => {
  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState(value)

  const activateEditModeHandler = () => {
    setEditMode(true)
    setTitle(value)
  }

  const disableEditModeHandler = () => {
    setEditMode(false)
    onChange(title)
  }

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode ? (
    <TextField
      variant="outlined"
      value={title}
      onChange={changeTitleHandler}
      autoFocus
      onBlur={disableEditModeHandler}
      disabled={disabled}
    />
  ) : (
    <span onDoubleClick={activateEditModeHandler}>{value}</span>
  )
})
