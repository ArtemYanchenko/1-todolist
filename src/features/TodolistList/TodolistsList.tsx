import React, {useCallback, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import Paper from '@mui/material/Paper';
import {Todolist} from './Todolist/TodoList';
import {addTodolistTC, getTodolistsTC} from '../../bll/todolistReducer';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import Container from '@mui/material/Container';
import {TodolistType} from '../../dal/api';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
export const TodolistsList = () => {

    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolistsTC());
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])

    return (
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
    );
};
