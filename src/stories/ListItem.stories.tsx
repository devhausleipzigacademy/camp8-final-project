import { ComponentStory, Meta, StoryObj } from "@storybook/react";
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
const Template: ComponentStory<typeof ListItem> = (args) => (
  <ListItem {...args} />
);

export default meta;

export const Default = Template.bind({});
Default.args = {
  image: "https://spoonacular.com/cdn/ingredients_100x100/bananas.jpg",
  name: "Banana",
  quantity: "1 unit",
};
