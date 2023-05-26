import axios from 'axios';

const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.0',
    withCredentials:true
})



export const TodolistsApi = {
    getTodolists () {
        return instance.get('/todo-lists')
    },
    createTodolist () {
        return instance.post('/todo-lists', {title:'newTodo'})
    },
    updateTitleTodo (id:string,title:string){
        return instance.put(`/todo-lists/${id}`, {title})
    },
    deleteTodo(id:string){
        return instance.delete(`/todo-lists/${id}`)

    }
}