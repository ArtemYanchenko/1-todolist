import {addTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from './tasksReducer';
import {addTodolistAC} from './todolistReducer';
import {TasksStateType} from '../App';


let startState: TasksStateType


beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: 'RxJS',
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                status: 0,
                priority: 1,
                startDate: '',
                deadline: '',
                addedDate: '2023-06-09T07:44:43.06'
            },
            {
                id: '2',
                title: 'hello',
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                status: 2,
                priority: 1,
                startDate: '',
                deadline: '',
                addedDate: '2023-06-07T16:00:25.61'
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'mutability123',
                description: '',
                todoListId: 'todolistId2',
                order: 0,
                status: 2,
                priority: 1,
                startDate: '',
                deadline: '',
                addedDate: '2023-06-07T16:00:25.61'
            },
            {
                id: '2',
                title: '5',
                description: '',
                todoListId: 'todolistId2',
                order: 0,
                status: 0,
                priority: 1,
                startDate: '',
                deadline: '',
                addedDate: '2023-06-07T16:00:25.61'
            },
        ]
    };
})


test('correct task should be deleted from correct array', () => {


    const action = removeTaskAC('todolistId2', '2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'].length).toBe(1)

});


test('correct task should be added to correct array', () => {
    const task =  {
            id: '2',
            title: 'juice',
            description: '',
            todoListId: 'todolistId2',
            order: 0,
            status: 0,
            priority: 1,
            startDate: '',
            deadline: '',
            addedDate: '2023-06-07T16:00:25.61'
        };
    const action = addTaskAC(task);
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce');
})


test('status of specified task should be changed', () => {
    const model =  {
        id: '2',
        title: 'juice',
        description: '',
        todoListId: 'todolistId2',
        order: 0,
        status: 2,
        priority: 1,
        startDate: '',
        deadline: '',
        addedDate: '2023-06-07T16:00:25.61'
    };
    const action = updateTaskAC('todolistId2', '2', model);

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].id).toBe('2');
    expect(endState['todolistId2'][1].status).toBe(2);
    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(3);
});


test('task  title should be changed', () => {
    const model =  {
        id: '2',
        title: 'juiceNEW',
        description: '',
        todoListId: 'todolistId2',
        order: 0,
        status: 2,
        priority: 1,
        startDate: '',
        deadline: '',
        addedDate: '2023-06-07T16:00:25.61'
    };
    const action = updateTaskAC('todolistId2', '2', model);

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].id).toBe('2');
    expect(endState['todolistId2'][1].title).toBe("juiceNEW");
    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(3);
});


test('new array should be added when new todolist is added', () => {
    const todolist = {
        id: 'todo3',
        title: 'new todolist',
        addedDate: '',
        order: 0
    }
    const action = addTodolistAC(todolist);
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});