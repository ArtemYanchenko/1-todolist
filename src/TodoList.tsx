import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import AddItemForm from './AddItemForm';
import {FilterValuesType} from './App';
import EditableSpan from './EditableSpan';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
    changeTodolistTitle: (todolistID: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    let tasksForTodolist = props.tasks;

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }


    const changeTodolistTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistID, newTitle)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID);
    }

    const addTaskHandler = (titleTask: string) => {
        props.addTask(props.todolistID, titleTask)
    }
    const onAllClickHandler = () => props.changeFilter(props.todolistID, 'all');
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, 'active');
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, 'completed');

    const changeTaskTitleHandler = (newTitle: string, taskID: string) => {
        props.changeTaskTitle(props.todolistID, taskID, newTitle)
    }


    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} callback={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <div>
            <AddItemForm callBack={addTaskHandler}/>
        </div>
        <ul>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan oldTitle={t.title}
                                      callback={(newTitle) => changeTaskTitleHandler(newTitle, t.id)}/>
                        <IconButton onClick={onClickHandler}>
                            <DeleteIcon/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ?  'outlined' : 'contained'} color='success'
                    onClick={onAllClickHandler}>All
            </Button>
            <Button variant={props.filter === 'active' ?  'outlined' : 'contained'} color='info'
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant={props.filter === 'completed' ?  'outlined' : 'contained'} color='error'
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}
