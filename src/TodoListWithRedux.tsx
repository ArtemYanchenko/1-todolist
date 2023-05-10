import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import {Button, Checkbox} from '@mui/material';
import {SuperCheckBox} from './SuperCheckBox';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './reducers/store';
import {TasksStateType, TodolistType} from './AppWithRedux';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './reducers/tasksReducer';
import {Simulate} from 'react-dom/test-utils';
import mouseUp = Simulate.mouseUp;
import {changeFilterAC} from './reducers/todolistReducer';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    filter: FilterValuesType
}

export function TodolistWithRedux(props: PropsType) {
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state=>state.tasks[props.id])
    const dispatch = useDispatch()


    function addTask(title: string) {
        dispatch(addTaskAC(props.id, title))
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

    function changeFilter(todolistId: string, valueFilter: FilterValuesType) {
        dispatch(changeFilterAC(todolistId, valueFilter))
    }


    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => changeFilter(props.id, 'all');
    const onActiveClickHandler = () => changeFilter(props.id, 'active');
    const onCompletedClickHandler = () => changeFilter(props.id, 'completed');

    const onChangeHandler = (taskID: string, checked: boolean) => {
        changeStatus(props.id, taskID, checked);
    }

    return <div>
        <h3><EditableSpan value={todolists.filter(el=>el.id === props.id)[0].title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    const onClickHandler = () => removeTask(props.id, t.id)

                    const onTitleChangeHandler = (newValue: string) => {
                        changeTaskTitle(props.id, t.id, newValue);
                    }


                    return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <SuperCheckBox callBack={(checked: boolean) => onChangeHandler(t.id, checked)}
                                       isDone={t.isDone}/>
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
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
}


