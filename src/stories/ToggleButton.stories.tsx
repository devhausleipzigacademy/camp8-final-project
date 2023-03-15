import { Meta, StoryObj } from "@storybook/react";
import { ToggleDarkmode } from "@/components/ToggleDarkmode";

const meta: Meta<typeof ToggleDarkmode> = {
  title: "components/ToggleDarkmode",
  component: ToggleDarkmode,
};

export default meta;

type Story = StoryObj<typeof ToggleDarkmode>;

export const Default: Story = {};
