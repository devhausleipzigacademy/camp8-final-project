import { Meta, StoryObj } from "@storybook/react";
import ListItem from "../components/ListItem";

const meta: Meta<typeof ListItem> = {
  title: "components/ListItem",
  component: ListItem
};

export default meta;

type Story = StoryObj<typeof ListItem>;

export const Unchecked: Story = {
  args: {
    image: "https://spoonacular.com/cdn/ingredients_100x100/bananas.jpg",
    name: "Banana",
    quantity: "1 unit",
  }
}

export const Checked: Story = {
  args: {
    image: "https://spoonacular.com/cdn/ingredients_100x100/bananas.jpg",
    name: "Banana",
    quantity: "1 unit",
    checked: true
  }
}
