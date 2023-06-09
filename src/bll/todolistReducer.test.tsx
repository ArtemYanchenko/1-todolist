import {v1} from 'uuid';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC,
    todolistReducer
} from './todolistReducer';
import {FilterValuesType, TodolistDomainType} from '../features/TodolistList/TodolistsList';

let todolistId1: string;
let todolistId2: string;
let startState: TodolistDomainType[] = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = []
})

test('correct todolist should be removed', () => {

    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});



test('correct todolist should be removed', () => {

    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist';
    const endState = todolistReducer(startState, addTodolistAC({id:'1',title:newTodolistTitle, addedDate:'', order:0}))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe('all');
    expect(endState[0].id).toBeDefined();
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist';
    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle);
    const endState = todolistReducer(startState, action);

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed';
    const action = changeFilterAC(todolistId2, newFilter);
    const endState = todolistReducer(startState, action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

test('correct todolist should be set to state', () => {
    const action = setTodolistsAC(startState);
    const endState = todolistReducer([], action);

    expect(endState.length).toBe(0);
});