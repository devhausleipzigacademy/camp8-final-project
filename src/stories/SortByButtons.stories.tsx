import { Meta, StoryObj } from "@storybook/react";
import { SortByButton } from "../components/SortByButton";

const meta: Meta<typeof SortByButton> = {
	title: "components/SortByButton",
	component: SortByButton,
};

export default meta;

type Story = StoryObj<typeof SortByButton>;

export const Default: Story = {};
