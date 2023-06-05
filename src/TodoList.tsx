import React, {FC, memo, useCallback, useMemo} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import {Button} from '@mui/material';
import TaskWithRedux from './TaskWithRedux';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './reducers/tasksReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './reducers/store';
import {FilterValuesType} from './AppWithRedux';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    changeFilter: (todolistId: string, valueFilter: FilterValuesType) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    filter: FilterValuesType
}

export const Todolist: FC<PropsType> = memo((props) => {

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolistId])
    const dispatch = useDispatch()

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [props.todolistId, props.title])

    const changeStatus = (todolistId: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, id, isDone))
    }

    const changeTaskTitle = (todolistId: string, id: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, id, newTitle))
    }

    const removeTask = (todolistId: string, id: string) => {
        dispatch(removeTaskAC(todolistId, id))
    }

    const removeTodolist = () => {
        props.removeTodolist(props.todolistId);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolistId, title);
    }, [props.todolistId, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolistId, 'all'), [props.todolistId, props.changeFilter]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolistId, 'active'), [props.todolistId, props.changeFilter]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolistId, 'completed'), [props.todolistId, props.changeFilter]);

    // const changeTaskStatus = (taskID: string, checked: boolean) => {
    //     props.changeTaskStatus(props.todolistId, taskID, checked);
    // }
    // const removeTask = (tasksID:string) => props.removeTask(props.todolistId, tasksID)

    // const changeTaskTitle = (taskID:string,newValue: string) => {
    //     props.changeTaskTitle(props.todolistId, taskID, newValue);
    // }


    let allTodolistTasks = tasks;

    useMemo(() => {
        if (props.filter === 'active') {
            allTodolistTasks = allTodolistTasks.filter(t => t.isDone === false);
        }
        if (props.filter === 'completed') {
            allTodolistTasks = allTodolistTasks.filter(t => t.isDone === true);
        }
        return allTodolistTasks
    }, [])


    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={(title)=>addTask(props.todolistId,title)}/>
        <div>
            {
                allTodolistTasks.map(t => <TaskWithRedux
                    todoID={props.todolistId}
                    taskID={t.id}
                    removeTask={(taskId: string) => removeTask(props.todolistId, taskId)}
                    changeTaskTitle={(taskId, newTitle) => changeTaskTitle(props.todolistId, taskId, newTitle)}
                    changeTaskStatus={(taskId, isDone) => changeStatus(props.todolistId, taskId, isDone)}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
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
