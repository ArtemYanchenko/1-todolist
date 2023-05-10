import React, {useCallback} from 'react';
import './App.css';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {TaskType, Todolist} from './TodoList';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from './reducers/todolistReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './reducers/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './reducers/tasksReducer';


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch()

    const  addTask = useCallback((todolistId: string, title: string)  =>{
        dispatch(addTaskAC(todolistId, title))
    },[dispatch])

    function changeStatus(todolistId: string, id: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(todolistId, id, isDone))
    }

    function changeTaskTitle(todolistId: string, id: string, newTitle: string) {
        dispatch(changeTaskTitleAC(todolistId, id, newTitle))
    }

    function removeTask(todolistId: string, id: string) {
        dispatch(removeTaskAC(todolistId, id))
    }

    const  addTodolist = useCallback((title: string)=> {
        const action = addTodolistAC(title);
        dispatch(action);
    },[dispatch])



    function changeTodolistTitle(todolistId: string, title: string) {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }

    function removeTodolist(todolistId: string) {
        dispatch(removeTodolistAC(todolistId))
    }


    function changeFilter(todolistId: string, valueFilter: FilterValuesType) {
        dispatch(changeFilterAC(todolistId, valueFilter))
    }
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === 'active') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />

                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

