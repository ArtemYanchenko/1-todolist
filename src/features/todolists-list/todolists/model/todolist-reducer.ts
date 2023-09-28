import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { StatusesType } from 'app/model/app-reducer'
import { ResultCode } from 'common/enums'
import { createAppAsyncThunk } from 'common/utils'
import { tasksThunks } from 'features/todolists-list/tasks/model/tasks-reducer'
import { FilterValuesType, TodolistDomainType } from 'features/todolists-list/todolists-list'
import { todolistsApi, TodolistType } from 'features/todolists-list/todolists/api/todolists.api'

const todolistsInitialState: TodolistDomainType[] = []

const slice = createSlice({
  name: 'todolists',
  initialState: todolistsInitialState,
  reducers: {
    changeFilterTodolist(
      state,
      action: PayloadAction<{ todolistId: string; filterValue: FilterValuesType }>
    ) {
      const index = state.findIndex(todo => todo.id === action.payload.todolistId)

      if (index !== -1) state[index].filter = action.payload.filterValue
    },
    changeTodolistEntityStatus(
      state,
      action: PayloadAction<{ todolistId: string; entityStatus: StatusesType }>
    ) {
      const index = state.findIndex(todo => todo.id === action.payload.todolistId)

      if (index !== -1) state[index].entityStatus = action.payload.entityStatus
    },
    removeTodolistsAfterLogout(state) {
      state = []
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        const newTodo: TodolistDomainType = {
          ...action.payload.todolist,
          filter: 'all',
          entityStatus: 'idle',
        }

        state.unshift(newTodo)
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.todolistId)

        if (index !== -1) state[index].title = action.payload.title
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.todolistId)

        if (index !== -1) state.splice(index, 1)
      })
  },
})

//thunks
const getTodolists = createAppAsyncThunk<
  {
    todolists: TodolistType[]
  },
  void
>('todolists/getTodolists', async (_, { dispatch }) => {
  const res = await todolistsApi.getTodolists()

  await res.data.forEach(tl => {
    dispatch(tasksThunks.fetchTasks(tl.id))
  })

  return { todolists: res.data }
})

const addTodolist = createAppAsyncThunk(
  'todolists/addTodolist',
  async (arg: { title: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const res = await todolistsApi.addTodolist(arg.title)

    if (res.data.resultCode === ResultCode.Success) {
      return { todolist: res.data.data.item }
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: false })
    }
  }
)

const changeTodolistTitle = createAppAsyncThunk(
  'todolists/changeTodolistTitle',
  async (
    arg: {
      todolistId: string
      title: string
    },
    { rejectWithValue }
  ) => {
    const res = await todolistsApi.changeTodolistTitle(arg.todolistId, arg.title)

    if (res.data.resultCode === ResultCode.Success) {
      return { todolistId: arg.todolistId, title: arg.title }
    } else {
      return rejectWithValue(null)
    }
  }
)

const removeTodolist = createAppAsyncThunk(
  'todolists/removeTodolist',
  async (
    arg: {
      todolistId: string
    },
    { dispatch, rejectWithValue }
  ) => {
    dispatch(
      todolistsActions.changeTodolistEntityStatus({
        todolistId: arg.todolistId,
        entityStatus: 'loading',
      })
    )
    const res = await todolistsApi.removeTodolist(arg.todolistId)

    dispatch(
      todolistsActions.changeTodolistEntityStatus({
        todolistId: arg.todolistId,
        entityStatus: 'idle',
      })
    )
    if (res.data.resultCode === ResultCode.Success) {
      return { todolistId: arg.todolistId }
    } else {
      return rejectWithValue(null)
    }
  }
)

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = { getTodolists, addTodolist, changeTodolistTitle, removeTodolist }
