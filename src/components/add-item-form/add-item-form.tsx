import React, { ChangeEvent, FC, KeyboardEvent, memo, useState } from 'react'

import { AddBox } from '@mui/icons-material'
import { IconButton, TextField } from '@mui/material'

import { RejectValueType } from 'common/utils/create-app-async-thunk'

type Props = {
  addItem: (title: string) => Promise<any>
  disabled?: boolean
}

export const AddItemForm: FC<Props> = memo(({ addItem, disabled }) => {
  let [title, setTitle] = useState('')
  let [error, setError] = useState<string | null>(null)

  const addItemHander = () => {
    if (title.trim() !== '') {
      addItem(title)
        .then(res => {
          setTitle('')
        })
        .catch((err: RejectValueType) => {
          debugger
          if (err.data) {
            const messages = err.data.messages

            setError(messages.length ? messages[0] : 'Some error occurred')
          }
        })
    } else {
      setError('Title is required')
    }
  }

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const addItemOnPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.charCode === 13) {
      addItemHander()
    }
  }

  return (
    <div>
      <TextField
        variant="outlined"
        error={!!error}
        value={title}
        onChange={changeTitleHandler}
        onKeyPress={addItemOnPressEnterHandler}
        label="Title"
        helperText={error}
        disabled={disabled}
      />
      <IconButton color="primary" onClick={addItemHander} disabled={disabled}>
        <AddBox />
      </IconButton>
    </div>
  )
})
