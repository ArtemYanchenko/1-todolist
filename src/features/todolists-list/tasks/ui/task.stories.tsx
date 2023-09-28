import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import Task from 'features/todolists-list/tasks/ui/task' // More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
  title: 'TODOLISTS/tasks',
  component: Task,
  tags: ['autodocs'],
  args: {
    // changeTaskTitle: action('title tasks did changed'),
    // changeTaskStatus: action('status tasks did changed'),
    // removeTask: action('tasks remove'),
    // tasks: {id: '111', isDone: false, title: 'JS'}
  },
}

export default meta
type Story = StoryObj<typeof Task>

export const TaskTaskIsNotDone: Story = {}

export const TaskTaskIsDone: Story = {
  args: {
    // tasks: {id: '111', isDone: true, title: 'JS'}
  },
}
