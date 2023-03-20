import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList from './TodoList';


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


    const getFilteredTasks = (tasksList:TaskType[],filterValue:FilterTaskType) => {
        switch (filterValue) {
            case 'active':
                return tasksList.filter(t=>!t.isDone)
            case 'completed':
                return tasksList.filter(t=>t.isDone)
            default:
                return tasksList;
        }
    }


    const tasksForRender = getFilteredTasks(tasks,filter);


    return (
        <div className="App">
            <TodoList
                title="What to learn"
                tasks={tasksForRender}
                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
