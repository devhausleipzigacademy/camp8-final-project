import { Meta, StoryObj } from "@storybook/react";
import ListItem from "../components/ListItem";

const meta: Meta<typeof ListItem> = {
  title: "components/ListItem",
  component: ListItem,
};

export default meta;

type Story = StoryObj<typeof ListItem>;

export const Default: Story = {};
