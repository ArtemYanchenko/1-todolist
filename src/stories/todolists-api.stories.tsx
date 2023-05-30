import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {TodolistsApi} from '../api/todolists-api';

export default {
    title: 'API'
}
const settings = {
    withCredentials:true
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistsApi.getTodolists().then((res)=>setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistsApi.createTodolist().then((res)=>{
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistsApi.deleteTodo('206ce943-5918-44ce-915f-e28694d587ff')
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistsApi.updateTitleTodo('481129f4-78c3-49e8-8128-ec09b3ab674c','newNewOldTodo')
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistsApi.getTasks('481129f4-78c3-49e8-8128-ec09b3ab674c').then((res)=>setState(res.data));
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const GreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistsApi.createTask('481129f4-78c3-49e8-8128-ec09b3ab674c',
            'newTitle')
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
