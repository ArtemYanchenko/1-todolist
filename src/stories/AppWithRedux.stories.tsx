import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {AddItemForm} from '../AddItemForm';
import {IconButton, TextField} from '@mui/material';
import {AddBox} from '@mui/icons-material';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AppWithRedux} from '../AppWithRedux';
import {Provider} from 'react-redux';
import {store} from '../reducers/store';
import reduxStoreProviderDecorator from '../reducers/decorator/reduxStoreProviderDecorator';

const meta: Meta<typeof AppWithRedux> = {
    title: 'TODOLISTS/AppWithRedux',
    component: AppWithRedux,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
    decorators:[reduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;

export const AppWithReduxStory: Story = {
    render: () => <AppWithRedux/>
};
