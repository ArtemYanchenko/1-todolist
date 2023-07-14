import React, { memo, useCallback, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { AddItemForm } from "components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import { Todolist } from "./Todolist/TodoList";
import { todolistsThunks } from "common/bll/todolistReducer";
import { useAppSelector } from "common/hooks/hooks";
import Container from "@mui/material/Container";
import { TodolistType } from "common/dal/tasksAPI";
import { StatusesType } from "app/appReducer";
import { Navigate } from "react-router-dom";
import { useActions } from "common/hooks/useActions";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: StatusesType;
};
export const TodolistsList = memo(() => {
  const todolists = useAppSelector<TodolistDomainType[]>((state) => state.todolists);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const { addTodolist: addTodolistTC, getTodolists } = useActions(todolistsThunks);

  const addTodolist = useCallback((title: string) => {
    addTodolistTC({ title });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getTodolists({});
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
    </Container>
  );
});
