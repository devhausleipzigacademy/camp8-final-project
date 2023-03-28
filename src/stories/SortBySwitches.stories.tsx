import { Meta, StoryObj } from "@storybook/react";
import { SortBySwitches } from "../components/List/SortBySwitches";

const meta: Meta<typeof SortBySwitches> = {
  title: "components/SortBySwitches",
  component: SortBySwitches,
};

export default meta;

type Story = StoryObj<typeof SortBySwitches>;

export const Default: Story = {};
