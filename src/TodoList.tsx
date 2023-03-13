import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterTaskType, TaskType} from './App';


type TodolistPropsType = {
    title: string,
    tasks: TaskType[],
    removeTask: (taskId: string) => void
    changeTodolistFilter: (filter: FilterTaskType) => void
    addTask: (title: string) => void
}


function TodoList(props: TodolistPropsType) {

    const [title, setTitle] = useState<string>('');
    const todoListItem = props.tasks.map((t) => {

        const onClickButtonHandler = () => {props.removeTask(t.id)}

        return (
            <li><input type="checkbox" checked={t.isDone}/>
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
    const onChangeInputHandler = (e:ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}

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
                        disabled={title.length == 0 || title.length > 20}
                        onClick={onClickButtonHandler}>+
                    </button>
                    {(title.length > 10 && title.length <= 20) ?
                        <div style={{color: 'white'}}>Title is too long</div> : ''}
                    {title.length > 20 ? <div style={{color: 'red'}}>Title is too long</div> : ''}
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
};

export default TodoList;