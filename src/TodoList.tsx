import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterTaskType, TaskType} from './App';


type TodolistPropsType = {
    title: string,
    tasks: TaskType[],
    removeTask: (taskId: string) => void
    changeTodolistFilter: (filter: FilterTaskType) => void
    addTask: (title: string) => void
    changeTaskStatus:(taskId:string,isDone:boolean) => void
}


function TodoList(props: TodolistPropsType) {

    const [title, setTitle] = useState<string>('');
    const todoListItem = props.tasks.map((t) => {

        const onClickButtonHandler = () => {
            props.removeTask(t.id)
        }

        const onChangeCheckBoxHandler = (e:ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id,e.currentTarget.checked)
        }

        return (
            <li><input type="checkbox" onChange={onChangeCheckBoxHandler} checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={onClickButtonHandler}>X
                </button>
            </li>
        )
    })

    const onClickButtonHandler = () => {
        if (title.trim()) {
            props.addTask(title);
            setTitle('');
        }
    }
    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onClickButtonHandler();
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const isAddTaskNotPossible = title.length == 0 || title.length > 20
    const longTitleWarning = (title.length > 10 && title.length <= 20) ?
        <div style={{color: 'white'}}>Title is too long</div> : '';
    const longTitleError = title.length > 20 ? <div style={{color: 'red'}}>Title is too long</div> : ''
    const onClickAllChangeTodolistHandler = () => props.changeTodolistFilter('all')
    const onClickActiveChangeTodolistHandler = () => props.changeTodolistFilter('active')
    const onClickCompletedChangeTodolistHandler = () => props.changeTodolistFilter('completed')

    return (
        <div>
            <div className="todolist">
                <h3>{props.title}</h3>
                <div>
                    <input
                        placeholder={'Enter task title'}
                        value={title}
                        onChange={onChangeInputHandler}
                        onKeyDown={onKeyDownInputHandler}/>
                    <button
                        disabled={isAddTaskNotPossible}
                        onClick={onClickButtonHandler}>+
                    </button>
                    {longTitleWarning}
                    {longTitleError}
                </div>
                <ul>
                    {todoListItem}
                </ul>
                <div>
                    <button onClick={onClickAllChangeTodolistHandler}>All</button>
                    <button onClick={onClickActiveChangeTodolistHandler}>Active</button>
                    <button onClick={onClickCompletedChangeTodolistHandler}>Completed</button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;