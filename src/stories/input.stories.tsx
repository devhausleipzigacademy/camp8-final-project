import { Meta, StoryObj } from "@storybook/react";
import Input from "../components/Input";

const meta: Meta<typeof Input> = {
	title: "components/Input",
	component: Input,
};

export default meta;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Email = Template.bind({});
Email.args = {
	type: "email",
};
export const Password = Template.bind({});
Password.args = {
	type: "password",
};

type Story = StoryObj<typeof Input>;

export const Default: Story = {};
