import React, { useEffect } from "react";
import "app/ui/app.module.css";
import { Header } from "components/header/header";
import { Login } from "features/auth/login/login";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "common/hooks/hooks";
import { CircularProgress } from "@mui/material";
import { authThunks } from "features/auth/auth-reducer";
import { Snackbars } from "components/snack-bar/snack-bar";
import { useActions } from "common/hooks/useActions";
import s from "app/ui/app.module.css";
import { TodolistsList } from "features/todolists-list/todolists-list";

export function App() {
  const isInitialized = useAppSelector((state) => state.app.isInitialized);
  const { initializeApp } = useActions(authThunks);

  useEffect(() => {
    initializeApp({});
  }, []);

  if (!isInitialized)
    return (
      <div className={s.circularProgressWrapper}>
        <CircularProgress />
      </div>
    );

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={"/"} element={<TodolistsList />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/404"} element={<h1 className={s.errorHeader}>PAGE NOT FOUND:</h1>} />
        <Route path={"*"} element={<Navigate to={"404"} />} />
      </Routes>
      <Snackbars />
    </div>
  );
}
