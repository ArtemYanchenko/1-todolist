import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { AddBox } from "@mui/icons-material";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
  disabled?: boolean;
};

export const AddItemForm = memo((props: AddItemFormPropsType) => {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addItemHander = () => {
    if (title.trim() !== "") {
      props.addItem(title);
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const addItemOnPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.charCode === 13) {
      addItemHander();
    }
  };

  return (
    <div>
      <TextField variant="outlined" error={!!error} value={title} onChange={changeTitleHandler} onKeyPress={addItemOnPressEnterHandler} label="Title" helperText={error} disabled={props.disabled} />
      <IconButton color="primary" onClick={addItemHander} disabled={props.disabled}>
        <AddBox />
      </IconButton>
    </div>
  );
});
