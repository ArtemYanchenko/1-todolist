import React, { useEffect } from "react";
import "./App.css";
import { Header } from "features/Header/Header";
import { Login } from "features/Login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { TodolistsList } from "features/TodolistList/TodolistsList";
import { useAppDispatch, useAppSelector } from "common/hooks/hooks";
import { CircularProgress } from "@mui/material";
import { authThunks } from "common/bll/authReducer";

export function App() {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector((state) => state.app.isInitialized);

  useEffect(() => {
    dispatch(authThunks.initializeApp());
  }, []);

  if (!isInitialized)
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "30%" }}>
        <CircularProgress />
      </div>
    );

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
