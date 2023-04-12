import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import ButtonAppBar from './AppBar';
import {Container, Grid, Paper} from '@mui/material';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from './reducers/todolistReducer';
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './reducers/tasksReducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsType = {
    id: string, title: string, filter: FilterValuesType;
}

export type TasksType = {
    [key: string]: TaskType[]
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchTodolists] = useReducer(todolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    });


    function addTask(todolistID: string, title: string) {
        dispatchTasks(addTaskAC(todolistID, title))
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        dispatchTasks(changeStatusAC(todolistID, taskId, isDone))
    }

    function changeTaskTitle(todolistID: string, taskID: string, newTitle: string) {
        dispatchTasks(changeTaskTitleAC(todolistID, taskID, newTitle))
    }

    function removeTask(todolistID: string, taskID: string) {
        dispatchTasks(removeTaskAC(todolistID,taskID))
    }

    function addTodolist(titleTodo: string) {
        const newID = v1();
        dispatchTodolists(addTodolistAC(titleTodo, newID))
        // setTasks({...tasks, [newID]: []})
    }

    function changeTodolistTitle(todolistID: string, newTitle: string) {
        dispatchTodolists(changeTodolistTitleAC(todolistID, newTitle))
    }

    function changeFilter(todolistID: string, filterValue: FilterValuesType) {
        dispatchTodolists(changeFilterAC(todolistID, filterValue))
    }

    function removeTodolist(todolistID: string) {
        dispatchTodolists(removeTodolistAC(todolistID))
        // delete tasks[todolistID];
        // setTasks({...tasks});
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>{todolists.map(el => {
                    return (
                        <Grid item key={el.id}>
                            <Paper elevation={3} style={{padding: '20px'}}>
                                <Todolist
                                    todolistID={el.id}
                                    title={el.title}
                                    tasks={tasks[el.id]}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={el.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    )
                })}</Grid>
            </Container>
        </div>
    );
}

export default App;
