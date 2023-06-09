import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import {Checkbox} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import {changeTaskCompletedTC, changeTaskTitleTC, removeTaskTC} from './reducers/tasksReducer';
import {TaskType} from './api/api';
import {useAppDispatch, useAppSelector} from './hooks/hooks';

export type PropsType = {
    todoID: string
    taskID: string
}

export const Task: FC<PropsType> = memo(({todoID, taskID}) => {

    const task = useAppSelector<TaskType>(state => state.tasks[todoID].filter(el => el.id === taskID)[0])
    const dispatch = useAppDispatch()

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskCompletedTC(todoID, taskID, e.currentTarget.checked))
    },[todoID,taskID])

    const changeTaskTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleTC(todoID, taskID, task , newTitle))
    },[todoID,taskID])

    const removeTask = useCallback(() => {
        dispatch(removeTaskTC(todoID,taskID))
    },[todoID,taskID])

    return (
        <div key={task.id} className={task.completed ? 'is-done' : ''}>
            <Checkbox
                checked={task.completed}
                color="primary"
                onChange={changeStatus}
            />

            <EditableSpan value={task.title} onChange={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    );
});

export default Task;