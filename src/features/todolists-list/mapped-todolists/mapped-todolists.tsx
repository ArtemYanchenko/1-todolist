import React from "react";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import s from "features/todolists-list/todolists-list.module.css";
import { Todolist } from "features/todolists-list/todolists/ui/todolist";
import { useAppSelector } from "common/hooks/hooks";
import { todolistsSelector } from "features/todolists-list/todolists-list.selectors";
import { TodolistDomainType } from "features/todolists-list/todolists-list";

export const MappedTodolists = () => {
  const todolists = useAppSelector<TodolistDomainType[]>(todolistsSelector);
  return (
    <>
      {todolists.map((tl) => {
        return (
          <Grid key={tl.id} item>
            <Paper className={s.paperWrapper}>{<Todolist key={tl.id} todolistId={tl.id} entityStatus={tl.entityStatus} filter={tl.filter} />}</Paper>
          </Grid>
        );
      })}
    </>
  );
};
