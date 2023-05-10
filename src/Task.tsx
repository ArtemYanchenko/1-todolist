import React, {ChangeEvent} from 'react';
import {Checkbox} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import {TaskType} from './TodoList';

export type TasksPropsType = {
    task:TaskType
    removeTask:(taskId: string)=>void
    changeTaskTitle: (taskId: string, newTitle: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}

export const Task = (props:TasksPropsType) => {

    const onClickHandler = () => props.removeTask(props.task.id)

    const onTitleChangeHandler = (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue);
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked);
    }

    return (
        <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox
                checked={props.task.isDone}
                color="primary"
                onChange={onChangeHandler}
            />


            <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
};

export default Task;