import React from 'react';
import './App.css';
import {TodolistsList} from './features/TodolistsList';
import {Header} from './features/Header';


export function App() {
    return (
        <div className="App">
            <Header/>
            <TodolistsList/>
        </div>
    );
}

