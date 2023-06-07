import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import {Checkbox} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import {TaskType} from './TodoList';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './reducers/store';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './reducers/tasksReducer';

export type PropsType = {
    todoID: string
    taskID: string
}

export const Task: FC<PropsType> = memo(({todoID, taskID}) => {

    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todoID].filter(el => el.id === taskID)[0])

    const dispatch = useDispatch()


    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(todoID, taskID, e.currentTarget.checked))
    },[todoID,taskID])

    const changeTaskTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(todoID, taskID, newTitle))
    },[todoID,taskID])

    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(todoID, taskID))
    },[todoID,taskID])

    return (
        <div key={task.id} className={task.isDone ? 'is-done' : ''}>
            <Checkbox
                checked={task.isDone}
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