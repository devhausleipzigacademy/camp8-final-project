import { Meta, StoryObj } from "@storybook/react";
import ListItem from "../components/ListItem";

const meta: Meta<typeof ListItem> = {
  title: "components/ListItem",
  component: ListItem,
  argTypes: {
    image: { control: "text" },
    name: { control: "text" },
    quantity: { control: "text" },
  },
};

export default meta;

const Banana = {
  image: "https://spoonacular.com/cdn/ingredients_100x100/bananas.jpg",
  name: "Banana",
  quantity: "1 unit",
  setSelected: () => {},
};

type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
  args: {
    ...Banana,
    selected: "Something Else",
  },
};

export const Selected: Story = {
  args: {
    ...Banana,
    selected: Banana.name,
  },
};
