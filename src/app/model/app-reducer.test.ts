import { appActions, AppInitialStateType, appReducer } from 'app/model/app-reducer'

let startState: AppInitialStateType

beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
    isInitialized: false,
  }
})

test('error should be changed', () => {
  const endState = appReducer(startState, appActions.setError({ error: 'newError' }))

  expect(endState.error).toBe('newError')
  expect(endState.status).toBe('idle')
})

test('isInitialized should be changed', () => {
  const endState = appReducer(startState, appActions.setIsInitialized({ isInitialized: true }))

  expect(endState.isInitialized).toBe(true)
  expect(endState.status).toBe('idle')
})
