import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {todolistsApi} from '../api/todolists-api';
import {log} from 'util';

export default {
    title: 'API'
}
const settings = {
    withCredentials: true
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolists().then((res) => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.addTodolist('hello').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.changeTodolistTitle('481129f4-78c3-49e8-8128-ec09b3ab674c', 'newNewOldTodo')
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.removeTodolist('206ce943-5918-44ce-915f-e28694d587ff')
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTasks('d735fa6e-4157-4c05-8e40-369d64b486cb').then((res) => setState(res.data));
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.addTask('481129f4-78c3-49e8-8128-ec09b3ab674c',
            'newTitle')
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.updateTask('d735fa6e-4157-4c05-8e40-369d64b486cb', '97dde830-2252-4ebb-a7e1-a3af15a26ebc', {
            deadline: '',
            description: '',
            completed: true,
            priority: 1,
            startDate: '',
            status: 0,
            title: '2H12ee12e12e12e12ELLOWORqweLD'
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.removeTask('d735fa6e-4157-4c05-8e40-369d64b486cb', '97dde830-2252-4ebb-a7e1-a3af15a26ebc')
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

