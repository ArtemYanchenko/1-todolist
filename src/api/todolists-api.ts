import axios from 'axios';

const settings = {
    withCredentials:true
}

export const TodolistsApi = {
    getTodolists () {
        return axios.get('https://social-network.samuraijs.com/api/1.0/todo-lists',settings)
    },
    createTodolist () {
       return axios.post('https://social-network.samuraijs.com/api/1.0/todo-lists', {title:'newTodo'} ,settings)
    },
    updateTitleTodo (id:string,title:string){
        return axios.put(`https://social-network.samuraijs.com/api/1.0/todo-lists/${id}`, {title} ,settings)
    },
    deleteTodo(id:string){
        return axios.delete(`https://social-network.samuraijs.com/api/1.0/todo-lists/${id}` ,settings)

    }
}