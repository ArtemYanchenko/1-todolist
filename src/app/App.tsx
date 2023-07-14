import React, { useEffect } from "react";
import "./App.css";
import { Header } from "features/Header/Header";
import { Login } from "features/Login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { TodolistsList } from "features/TodolistList/TodolistsList";
import { useAppSelector } from "common/hooks/hooks";
import { CircularProgress } from "@mui/material";
import { authThunks } from "common/bll/authReducer";
import { Snackbars } from "components/SnackBar/SnackBar";
import { useActions } from "common/hooks/useActions";

export function App() {
  const isInitialized = useAppSelector((state) => state.app.isInitialized);
  const { initializeApp } = useActions(authThunks);

  useEffect(() => {
    initializeApp({});
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
      <Snackbars />
    </div>
  );
}
