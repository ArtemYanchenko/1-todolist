import React, { memo, useCallback, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { AddItemForm } from "components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import { Todolist } from "./Todolist/TodoList";
import { todolistsThunks } from "common/bll/todolistReducer";
import { useAppDispatch, useAppSelector } from "common/hooks/hooks";
import Container from "@mui/material/Container";
import { TodolistType } from "common/dal/tasksAPI";
import { Snackbars } from "components/SnackBar/SnackBar";
import { StatusesType } from "app/appReducer";
import { Navigate } from "react-router-dom";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: StatusesType;
};
export const TodolistsList = memo(() => {
  const todolists = useAppSelector<TodolistDomainType[]>((state) => state.todolists);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  const addTodolist = useCallback((title: string) => {
    dispatch(todolistsThunks.addTodolist({ title }));
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(todolistsThunks.getTodolists());
    }
  }, []);

  if (!isLoggedIn) return <Navigate to={"/login"} />;

  return (
    <Container fixed>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          return (
            <Grid key={tl.id} item>
              <Paper style={{ padding: "10px" }}>
                <Todolist key={tl.id} todolistId={tl.id} entityStatus={tl.entityStatus} filter={tl.filter} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <Snackbars />
    </Container>
  );
});
