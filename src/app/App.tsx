import React from 'react';
import './App.css';
import {TodolistsList} from '../features/TodolistList/TodolistsList';
import {Header} from '../features/Header/Header';


export function App() {
    return (
        <div className="App">
            <Header/>
            <TodolistsList/>
        </div>
    );
}

