import React, { useEffect } from "react";
import "./App.css";
import { Header } from "../features/Header/Header";
import { Login } from "../features/Login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { TodolistsList } from "../features/TodolistList/TodolistsList";
import { useAppDispatch } from "../hooks/hooks";
import { authTC } from "../bll/authReducer";

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authTC());
  }, []);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={"/"} element={<TodolistsList />} />
        <Route path={"/login"} element={<Login />} />
        <Route
          path={"/404"}
          element={
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              PAGE NOT FOUND:
            </h1>
          }
        />
        <Route path={"*"} element={<Navigate to={"404"} />} />
      </Routes>
    </div>
  );
}
