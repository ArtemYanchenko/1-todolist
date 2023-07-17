import React, { FC } from "react";
import { EditableSpan } from "components/editable-span/editable-span";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import { useAppSelector } from "common/hooks/hooks";
import { useActions } from "common/hooks/useActions";
import { todolistsThunks } from "features/todolists-list/todolists/model/todolist-reducer";
import { StatusesType } from "app/appReducer";

type Props = {
  todolistId: string;
  entityStatus: StatusesType;
};

const TodolistTitle: FC<Props> = ({ todolistId, entityStatus }) => {
  const todolists = useAppSelector((state) => state.todolists.find((el) => el.id === todolistId));
  const { changeTodolistTitle, removeTodolist } = useActions(todolistsThunks);

  const changeTodolistTitleCallBack = (title: string) => {
    changeTodolistTitle({ todolistId, title });
  };

  const removeTodolistCallBack = () => {
    removeTodolist({ todolistId });
  };

  return (
    <h3>
      <EditableSpan value={todolists!.title} onChange={changeTodolistTitleCallBack} />
      <IconButton onClick={removeTodolistCallBack} disabled={entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  );
};

export default TodolistTitle;
