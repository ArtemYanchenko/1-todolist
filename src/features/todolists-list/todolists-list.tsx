import React, { memo, useCallback, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { AddItemForm } from "components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import { Todolist } from "features/todolists-list/todolists/todolist";
import { todolistsThunks } from "features/todolists-list/todolists/todolist-reducer";
import { useAppSelector } from "common/hooks/hooks";
import Container from "@mui/material/Container";
import { StatusesType } from "app/appReducer";
import { Navigate } from "react-router-dom";
import { useActions } from "common/hooks/useActions";
import { TodolistType } from "features/todolists-list/todolists/todolistsAPI";

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
