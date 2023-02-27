import { Meta, StoryObj } from "@storybook/react";
import { ItemListMapper } from "../components/List/ItemListMapper";

const meta: Meta<typeof ItemListMapper> = {
  title: "components/ItemListMapper",
  component: ItemListMapper,
};

export default meta;

type Story = StoryObj<typeof ItemListMapper>;

export const Default: Story = {};
