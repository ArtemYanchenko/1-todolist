import React, {memo, useCallback, useMemo} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import {Button} from '@mui/material';
import TaskWithRedux from './TaskWithRedux';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './reducers/tasksReducer';
import {useDispatch} from 'react-redux';


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

    const dispatch = useDispatch()

    function addTask(todolistId: string, title: string) {
        dispatch(addTaskAC(todolistId, title))
    }

    function changeStatus(todolistId: string, id: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(todolistId, id, isDone))
    }

    function changeTaskTitle(todolistId: string, id: string, newTitle: string) {
        dispatch(changeTaskTitleAC(todolistId, id, newTitle))
    }

    function removeTask(todolistId: string, id: string) {
        dispatch(removeTaskAC(todolistId, id))
    }

    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title);
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, 'all'),[props.id,props.changeFilter]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, 'active'),[props.id,props.changeFilter]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id, 'completed'),[props.id,props.changeFilter]);

    const changeTaskStatus = (taskID: string, checked: boolean) => {
        props.changeTaskStatus(props.id, taskID, checked);
    }
    const removeTask = (tasksID:string) => props.removeTask(props.id, tasksID)

    const changeTaskTitle = (taskID:string,newValue: string) => {
        props.changeTaskTitle(props.id, taskID, newValue);
    }




    let allTodolistTasks = props.tasks;

    useMemo(()=>{
        if (props.filter === 'active') {
            allTodolistTasks = allTodolistTasks.filter(t => t.isDone === false);
        }
        if (props.filter === 'completed') {
            allTodolistTasks = allTodolistTasks.filter(t => t.isDone === true);
        }
        return allTodolistTasks
    },[])


    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {/*{*/}
            {/*    allTodolistTasks.map(t => <Task task={t} removeTask={removeTask} changeTaskTitle={changeTaskTitle} changeTaskStatus={changeTaskStatus}/>)*/}
            {/*}*/}
            {
                allTodolistTasks.map(t => <TaskWithRedux todoID={props.id} taskID={t.id} removeTask={removeTask} changeTaskTitle={changeTaskTitle} changeTaskStatus={changeTaskStatus}/>)
            }
        </div>
        <div style={{paddingTop: "10px"}}>
            <ButtonWithMemo
                title={'All'}
                variant={props.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}
                color={'inherit'}
            />
            <ButtonWithMemo
                title={'Active'}
                variant={props.filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}
                color={'primary'}
            />
            <ButtonWithMemo
                title={'Completed'}
                variant={props.filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}
                color={'secondary'}
            />
        </div>
    </div>
})

type ButtonWithMemoPropsType = {
    title: string
    onClick: () => void
    variant: 'text' | 'outlined' | 'contained'
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
}

const ButtonWithMemo = memo((props: ButtonWithMemoPropsType) => {
    return <Button variant={props.variant}
                   onClick={props.onClick}
                   color={props.color}>{props.title}
    </Button>
})
