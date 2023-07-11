import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Logout, Menu } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { LinearColor } from "./PreLoader";
import React from "react";
import { useAppSelector } from "common/hooks/hooks";
import { authThunks } from "common/bll/authReducer";
import { useActions } from "common/hooks/useActions";

export const Header = () => {
  const status = useAppSelector((state) => state.app.status);
  const { logout } = useActions(authThunks);
  const logoutHandler = () => {
    logout();
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: "space-between", padding: "0px 130px" }}>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Typography variant="h6"></Typography>
        <Button color="inherit">
          <Logout onClick={logoutHandler} />
        </Button>
      </Toolbar>
      {status === "loading" && <LinearColor />}
    </AppBar>
  );
};
