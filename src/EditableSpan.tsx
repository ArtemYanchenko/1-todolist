import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    oldTitle: string
    callback: (newTitle: string) => void
}

const EditableSpan = (props: PropsType) => {
    const [newTitle, setNewTitle] = useState(props.oldTitle)
    const [editMode, setEditMode] = useState<boolean>(false)

    const activateEditMode = () => {
        setEditMode(true);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const disactivateEditMode = () => {
        setEditMode(false)
        props.callback(newTitle)
    }

    return (
        editMode
            ? <input type="text"
                     value={newTitle}
                     autoFocus
                     onChange={onChangeHandler}
                     onBlur={disactivateEditMode}/>
            : <span onDoubleClick={activateEditMode}>{props.oldTitle}</span>

    );
};

export default EditableSpan;