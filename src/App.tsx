import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import {Menu} from '@mui/icons-material';
import {Todolist} from './TodoList';
import {addTodolistTC, getTodolistsTC,} from './reducers/todolistReducer';
import {TaskType, TodolistType} from './api/api';
import {useAppDispatch, useAppSelector} from './hooks/hooks';


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export function App() {

    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists);
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(getTodolistsTC());
    },[])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])



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
                            return <Grid key={tl.id} item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        todolistId={tl.id}
                                        filter={tl.filter}
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

