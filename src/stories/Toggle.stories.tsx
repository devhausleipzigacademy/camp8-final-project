import { Meta, StoryObj } from "@storybook/react";
import Toggle from "../components/Toggle";

const meta: Meta<typeof Toggle> = {
  title: "components/Toggle",
  component: Toggle,
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {};
