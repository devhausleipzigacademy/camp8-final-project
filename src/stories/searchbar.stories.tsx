import { Meta, StoryObj } from "@storybook/react";
import SearchBar from "@/components/searchbar";

const meta: Meta<typeof SearchBar> = {
	title: "components/searchbar",
	component: SearchBar,
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {};
