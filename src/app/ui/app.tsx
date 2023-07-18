import React, { useEffect } from "react";
import "app/ui/app.module.css";
import { Header } from "components/header/header";
import { useAppSelector } from "common/hooks/hooks";
import { CircularProgress } from "@mui/material";
import { authThunks } from "features/auth/auth-reducer";
import { Snackbars } from "components/snack-bar/snack-bar";
import { useActions } from "common/hooks/useActions";
import s from "app/ui/app.module.css";
import { AppRoutes } from "app/ui/app-routes";

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
      <AppRoutes />
      <Snackbars />
    </div>
  );
}
