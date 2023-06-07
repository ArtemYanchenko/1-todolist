import React, {FC, memo, useCallback, useEffect} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import {Button} from '@mui/material';
import TaskWithRedux from './Task';
import {addTaskAC, fetchTasksTC} from './reducers/tasksReducer';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './reducers/store';
import {FilterValuesType} from './App';
import {TaskType, TodolistType} from './api/todolists-api';
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from './reducers/todolistReducer';
import {useAppDispatch} from './hooks/hooks';



type PropsType = {
    todolistId: string
    filter: FilterValuesType
}

export const Todolist: FC<PropsType> = memo(({todolistId,filter}) => {

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolistId])
    const todolists = useSelector<AppRootStateType,TodolistType | undefined>(state=>state.todolists.find(el=>el.id === todolistId))
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchTasksTC(todolistId));
    },[todolistId])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(todolistId, title))
    },[todolistId])



    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [dispatch])

    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])


    function filteredTasks(): TaskType[] {
        if (filter === 'active') {
            return tasks.filter(t => !t.completed);
        }
        if (filter === 'completed') {
            return tasks.filter(t => t.completed);
        }
        return tasks
    }


    let allTodolistTasks = filteredTasks();

    return <div>
        <h3>
            <EditableSpan value={todolists!.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                allTodolistTasks.map(t => <TaskWithRedux
                    todoID={todolistId}
                    taskID={t.id}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <ButtonWithMemo
                title={'All'}
                variant={filter === 'all' ? 'outlined' : 'text'}
                onClick={()=>dispatch(changeFilterAC(todolistId, 'all'))}
                color={'inherit'}
            />
            <ButtonWithMemo
                title={'Active'}
                variant={filter === 'active' ? 'outlined' : 'text'}
                onClick={()=>dispatch(changeFilterAC(todolistId, 'active'))}
                color={'primary'}
            />
            <ButtonWithMemo
                title={'Completed'}
                variant={filter === 'completed' ? 'outlined' : 'text'}
                onClick={()=>dispatch(changeFilterAC(todolistId, 'completed'))}
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
