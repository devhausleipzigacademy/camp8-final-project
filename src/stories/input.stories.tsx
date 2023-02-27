import { ComponentStory, Meta, StoryObj } from "@storybook/react";
import Input from "../components/Input";

const meta: Meta<typeof Input> = {
	title: "components/Input",
	component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

const Template: StoryObj<typeof Input> = (args: any) => <Input {...args} />;

// const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Email = Template.bind({});
Email.args = {
	type: "email",
};
export const Password = Template.bind({});
Password.args = {
	type: "password",
};

export const Default: Story = {};

// export const Default: ComponentStory = {};
