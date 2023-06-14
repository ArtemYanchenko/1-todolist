import {v1} from 'uuid';
import {
    addTodolistAC,
    changeFilterAC, changeTodolistEntityStatusAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC,
    todolistReducer
} from './todolistReducer';
import {FilterValuesType, TodolistDomainType} from '../features/TodolistList/TodolistsList';
import {StatusesType} from '../app/app-reducer';

let startState: TodolistDomainType[] = [];

beforeEach(() => {
    startState = [
        {
            addedDate: '2023-06-09T07:44:37.557',
            id: '1',
            order: -8,
            title: 'VUE', filter: 'all',
            entityStatus: 'idle'
        },
        {
            addedDate: '2023-06-09T07:44:37.557',
            id: '2',
            order: -8,
            title: 'js', filter: 'all',
            entityStatus: 'idle'
        }]
})

test('correct todolist should be removed', () => {

    const endState = todolistReducer(startState, removeTodolistAC('1'))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe('2');
});


test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist';
    const endState = todolistReducer(startState, addTodolistAC({
        id: '3',
        title: newTodolistTitle,
        addedDate: '',
        order: 0
    }))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe('all');
    expect(endState[0].id).toBeDefined();
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist';
    const action = changeTodolistTitleAC('1', newTodolistTitle);
    const endState = todolistReducer(startState, action);

    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[1].title).toBe('js');
});


test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed';
    const action = changeFilterAC('1', newFilter);
    const endState = todolistReducer(startState, action);

    expect(endState[0].filter).toBe('completed');
    expect(endState[1].filter).toBe('all');
});

test('correct entityStatus of todolist should be changed', () => {
    let newStatus: StatusesType = 'loading';
    const action = changeTodolistEntityStatusAC('1', newStatus);
    const endState = todolistReducer(startState, action);

    expect(endState[0].entityStatus).toBe('loading');
    expect(endState[1].entityStatus).toBe('idle');
});

test('correct todolist should be set to state', () => {
    const action = setTodolistsAC(startState);
    const endState = todolistReducer([], action);

    expect(endState.length).toBe(2);
});
