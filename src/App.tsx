import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterTaskType = 'all' | 'active' | 'completed';

function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'ES6', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterTaskType>('all')

    const removeTask = (taskId: string) => {
        let newTasks = tasks.filter((t) => t.id !== taskId)
        setTasks(newTasks)
    }

    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false};
        setTasks([newTask, ...tasks])
    }

    const changeTodolistFilter = (filter: FilterTaskType) => {
        setFilter(filter);
    }

    const changeTaskStatus = (taskId:string,isDone:boolean) => {
        setTasks(tasks.map(t=>t.id === taskId ? {...t,isDone} : t))
    }


    let tasksForRender: TaskType[] = tasks;

    if (filter === 'active') {
        tasksForRender = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForRender = tasks.filter(t => t.isDone)
    }


    return (
        <div className="App">
            <TodoList
                title="What to learn"
                tasks={tasksForRender}
                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
