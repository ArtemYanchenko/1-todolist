// @ts-ignore
import { authReducer, authThunks } from 'features/auth/auth-reducer'

let startState: { isLoggedIn: boolean }

beforeEach(() => {
  startState = { isLoggedIn: false }
})

test('test should be return truthy value on isLoggedIn', () => {
  const arg = { isLoggedIn: true }
  const action = authThunks.login.fulfilled(arg, 'requestId', {
    email: '',
    rememberMe: true,
    password: '',
  })
  const endState = authReducer(startState, action)

  expect(endState.isLoggedIn).toEqual(true)
})
