import {
	ComponentMeta,
	ComponentStory,
	Meta,
	StoryObj,
} from "@storybook/react";
import { LargeButton } from "../components/LargeButton";

export default {
	title: "components/LargeButton",
	component: LargeButton,
	argTypes: {
		variant: {
			options: ["primary", "secondary"],
			control: { type: "radio" },
		},
	},
} as ComponentMeta<typeof LargeButton>;

const Template: ComponentStory<typeof LargeButton> = (args: any) => (
	<LargeButton {...args} />
);

export const largeButton = Template.bind({});
