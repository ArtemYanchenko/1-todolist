import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    callback: (newTitle: string) => void
}

const EditableSpan = (props: PropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState('')
    const activateEditMode = () => {
        setEditMode(true);
        setNewTitle(props.title)
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const disactivateEditMode =()=>{
        setEditMode(false)
        props.callback(newTitle)
    }

    return (
        <>
            {
                editMode
                    ? <input type="text" value={newTitle} autoFocus onChange={onChangeHandler} onBlur={disactivateEditMode}/>
                    : <span onDoubleClick={activateEditMode}>{props.title}</span>
            }
        </>
    );
};

export default EditableSpan;