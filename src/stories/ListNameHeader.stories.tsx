import { Meta, StoryObj } from "@storybook/react";
import { ArrowButton } from "../components/ListNameHeader";

const meta: Meta<typeof ArrowButton> = {
  title: "components/ArrowButton",
  component: ArrowButton,
};

export default meta;

type Story = StoryObj<typeof ArrowButton>;

export const Default: Story = {};
