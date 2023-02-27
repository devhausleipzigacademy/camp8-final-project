import SearchBar from "@/components/SearchBar";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta<typeof SearchBar> = {
	title: "components/searchBar",
	component: SearchBar,
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {};
