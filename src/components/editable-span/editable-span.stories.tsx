import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import React from "react";
import { EditableSpan } from "components/editable-span/editable-span";

const meta: Meta<typeof EditableSpan> = {
  title: "TODOLISTS/editable-span",
  component: EditableSpan,
  tags: ["autodocs"],
  argTypes: {
    value: {
      description: "set start value",
    },
    onChange: {
      description: "value onchange",
    },
  },
  args: {
    value: "hello",
    onChange: action("title want to change"),
  },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {};
