import React, {ChangeEvent} from 'react';
import {Checkbox} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import {TaskType} from './TodoList';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './reducers/store';

export type TasksPropsType = {
    todoID:string
    taskID:string
    removeTask:(taskId: string)=>void
    changeTaskTitle: (taskId: string, newTitle: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}

export const Task = (props:TasksPropsType) => {

    const task = useSelector<AppRootStateType,TaskType>(state => state.tasks[props.todoID].filter(el=>el.id === props.taskID)[0])

    const onClickHandler = () => props.removeTask(task.id)

    const onTitleChangeHandler = (newValue: string) => {
        props.changeTaskTitle(task.id, newValue);
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(task.id, e.currentTarget.checked);
    }

    return (
        <div key={task.id} className={task.isDone ? 'is-done' : ''}>
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={onChangeHandler}
            />


            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
};

export default Task;