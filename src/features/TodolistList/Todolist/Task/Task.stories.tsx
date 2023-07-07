import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AddItemForm } from "../../../../components/AddItemForm/AddItemForm";
import { IconButton, TextField } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import Task from "./Task";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
  title: "TODOLISTS/Task",
  component: Task,
  tags: ["autodocs"],
  args: {
    // changeTaskTitle: action('title task did changed'),
    // changeTaskStatus: action('status task did changed'),
    // removeTask: action('tasks remove'),
    // task: {id: '111', isDone: false, title: 'JS'}
  },
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskTaskIsNotDone: Story = {};

export const TaskTaskIsDone: Story = {
  args: {
    // task: {id: '111', isDone: true, title: 'JS'}
  },
};
