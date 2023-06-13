import {AppInitialStateType, appReducer, setErrorAC, setStatusAC} from './app-reducer';
let startState:AppInitialStateType

beforeEach(()=>{
    startState = {
        status:'idle',
        error:null
    }
})

test('status should be changed',()=>{
    const endState = appReducer(startState,setStatusAC('loading'))
    expect(endState.status).toBe('loading');
    expect(endState.error).toBeNull();
})

test('error should be changed',()=>{
    const endState = appReducer(startState,setErrorAC('newError'))
    expect(endState.error).toBe('newError');
    expect(endState.status).toBe('idle');
})