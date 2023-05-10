import React, {ChangeEvent, memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import {Button, Checkbox} from '@mui/material';
import {SuperCheckBox} from './SuperCheckBox';
import Task from './Task';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, valueFilter: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
}

export const Todolist = memo((props: PropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title);
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.id, props.changeTodolistTitle])

    const onAllClickHandler = () => props.changeFilter(props.id, 'all');
    const onActiveClickHandler = () => props.changeFilter(props.id, 'active');
    const onCompletedClickHandler = () => props.changeFilter(props.id, 'completed');

    const changeTaskStatus = (taskID: string, checked: boolean) => {
        props.changeTaskStatus(props.id, taskID, checked);
    }
    const removeTask = (tasksID:string) => props.removeTask(props.id, tasksID)

    const changeTaskTitle = (taskID:string,newValue: string) => {
        props.changeTaskTitle(props.id, taskID, newValue);
    }

    let allTodolistTasks = props.tasks;
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
    }

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                allTodolistTasks.map(t => <Task task={t} removeTask={removeTask} changeTaskTitle={changeTaskTitle} changeTaskStatus={changeTaskStatus}/>)
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


