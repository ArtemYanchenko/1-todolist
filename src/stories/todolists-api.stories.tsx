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
        TodolistsApi.deleteTodo('235e8914-0825-4e53-a05f-9f68cb62b4fd')
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistsApi.updateTitleTodo('cf3c83b4-bb06-4828-b75a-f84ac8abd26b','newNewOldTodo')
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistsApi.updateTitleTodo('cf3c83b4-bb06-4828-b75a-f84ac8abd26b','newNewOldTodo')
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
