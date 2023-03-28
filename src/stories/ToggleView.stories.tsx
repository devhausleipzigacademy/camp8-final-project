import { Meta, StoryObj } from "@storybook/react";
import { ToggleView } from "../components/ToggleView";

const meta: Meta<typeof ToggleView> = {
  title: "components/ToggleView",
  component: ToggleView,
};

export default meta;

type Story = StoryObj<typeof ToggleView>;

export const Default: Story = {};
