import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { TodolistsList } from "features/todolists-list/todolists-list";
import { Login } from "features/auth/login/login";
import s from "app/ui/app.module.css";

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<TodolistsList />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/404"} element={<h1 className={s.errorHeader}>PAGE NOT FOUND:</h1>} />
        <Route path={"*"} element={<Navigate to={"404"} />} />
      </Routes>
    </>
  );
};
