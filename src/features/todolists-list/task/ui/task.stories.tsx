import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Task from "features/todolists-list/task/ui/task";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
  title: "TODOLISTS/task",
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
