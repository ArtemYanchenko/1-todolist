import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {IconButton, TextField} from '@mui/material';
import {AddBox} from '@mui/icons-material';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {EditableSpan} from './EditableSpan';

const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    argTypes: {
        value:{
            description:'set start value',
        },
        onChange:{
            description:'value onchange'
        }
    },
    args:{
        value:'hello',
        onChange:action('title want to change')
    }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
};
