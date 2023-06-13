import AppBar from '@mui/material/AppBar/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {Menu} from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {LinearColor} from './PreLoader';
import React from 'react';
import {useAppSelector} from '../../hooks/hooks';

export const Header = () => {
    const status = useAppSelector(state=>state.app.status)
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    Login
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
            {(status === 'loading') && <LinearColor/>}
        </AppBar>
    );
};