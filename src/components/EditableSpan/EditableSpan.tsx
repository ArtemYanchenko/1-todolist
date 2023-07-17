import TextField from "@mui/material/TextField/TextField";
import React, { ChangeEvent, memo, useState } from "react";

type EditableSpanPropsType = {
  value: string;
  onChange: (newValue: string) => void;
  disabled?: boolean;
};

export const EditableSpan = memo((props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(props.value);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.value);
  };
  const disableEditMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField variant="outlined" value={title} onChange={changeTitle} autoFocus onBlur={disableEditMode} disabled={props.disabled} />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.value}</span>
  );
});
