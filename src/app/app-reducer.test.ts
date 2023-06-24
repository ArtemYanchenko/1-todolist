import { appActions, AppInitialStateType, appReducer } from "./app-reducer";

let startState: AppInitialStateType;

beforeEach(() => {
  startState = {
    status: "idle",
    error: null,
    isInitialized: false,
  };
});

test("status should be changed", () => {
  const endState = appReducer(startState, appActions.setStatus({ status: "loading" }));
  expect(endState.status).toBe("loading");
  expect(endState.error).toBeNull();
});

test("error should be changed", () => {
  const endState = appReducer(startState, appActions.setError({ error: "newError" }));
  expect(endState.error).toBe("newError");
  expect(endState.status).toBe("idle");
});

test("isInitialized should be changed", () => {
  const endState = appReducer(startState, appActions.setIsInitialized({ isInitialized: true }));
  expect(endState.isInitialized).toBe(true);
  expect(endState.status).toBe("idle");
});
