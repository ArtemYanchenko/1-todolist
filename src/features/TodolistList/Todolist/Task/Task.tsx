import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import {removeTaskTC, updateTaskTC} from '../../../../bll/tasksReducer';
import {TaskStatuses, TaskType} from '../../../../dal/api';
import {useAppDispatch, useAppSelector} from '../../../../hooks/hooks';
import classes from './Task.module.css'
import Switch from '@mui/material/Switch/Switch';
import Checkbox from '@mui/material/Checkbox/Checkbox';

export type PropsType = {
    todoID: string
    taskID: string
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export const Task: FC<PropsType> = memo(({todoID, taskID}) => {

    const task = useAppSelector<TaskType>(state => state.tasks[todoID].filter(el => el.id === taskID)[0])
    const dispatch = useAppDispatch()

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskTC(todoID, taskID, {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}))
    }, [todoID, taskID])

    const changeTaskTitle = useCallback((newTitle: string) => {
        dispatch(updateTaskTC(todoID, taskID, {title: newTitle}))
    }, [todoID, taskID])

    const removeTask = useCallback(() => {
        dispatch(removeTaskTC(todoID, taskID))
    }, [todoID, taskID])

    return (
        <div key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            {/*<Switch checked={task.status === TaskStatuses.Completed}*/}
            {/*        color="warning"*/}
            {/*        disabled={task.entityStatus === 'loading'}*/}
            {/*        onChange={changeStatus}*/}
            {/*/>*/}
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                disabled={task.entityStatus === 'loading'}
                color="success"
                onChange={changeStatus}
            />

            <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={task.entityStatus === 'loading'}/>
            <IconButton onClick={removeTask} disabled={task.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </div>
    );
});

export default Task;