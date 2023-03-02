import { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "../components/IconButton";

const meta: Meta<typeof IconButton> = {
  title: "components/IconButton",
  component: IconButton,
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};
