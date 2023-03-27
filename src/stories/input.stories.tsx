import {
  ComponentMeta,
  ComponentStory,
  Meta,
  StoryObj,
} from "@storybook/react";
import Input from "../components/Input";

export default {
  title: "components/Input",
  component: Input,
  argTypes: {
    type: {
      options: ["email", "New name"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = () => <Input type="" />;

export const inputField = Template.bind({});
