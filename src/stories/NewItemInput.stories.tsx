import { Meta, StoryObj } from "@storybook/react";
import { NewItemInput } from "../components/NewItemInput";

const meta: Meta<typeof NewItemInput> = {
	title: "components/NewItemInput",
	component: NewItemInput,
};

export default meta;

type Story = StoryObj<typeof NewItemInput>;

export const Default: Story = {};
