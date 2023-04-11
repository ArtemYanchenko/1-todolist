import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type PropsType = {
    callBack: (newTitle: string) => void
}

const AddItemForm = (props: PropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.callBack(title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTask();
        }
    }

    const buttonStyle = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px',
        backgroundColor: 'green'
    }


    return (
        <div>
            <TextField id="outlined-basic"
                       label={error ? "Title is required" : 'Please type here...'}
                       variant="outlined"
                       size='small'
                       value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                       error={!!error}
            />

            {/*<TextField*/}
            {/*    size="small"*/}
            {/*    id="outlined-basic"*/}
            {/*    label={error ? "Title is required" : 'Please type here...'}*/}
            {/*    variant="outlined"*/}
            {/*    value={title}*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    onKeyPress={onKeyPressHandler}*/}
            {/*    error={!!error}*/}

            {/*/>*/}
            <Button variant={'contained'} style={buttonStyle} onClick={addTask}>+</Button>
        </div>
    );
};

export default AddItemForm;