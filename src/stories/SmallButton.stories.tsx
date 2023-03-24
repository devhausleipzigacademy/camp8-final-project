import {
	ComponentMeta,
	ComponentStory,
	Meta,
	StoryObj,
} from "@storybook/react";
import { SmallButton } from "../components/SmallButton";

export default {
	title: "components/SmallButton",
	component: SmallButton,
	argTypes: {
		disabled: {
			options: [true, false],
			control: { type: "radio" },
		},
	},
} as ComponentMeta<typeof SmallButton>;

const Template: ComponentStory<typeof SmallButton> = (args: any) => (
	<SmallButton {...args} />
);

export const smallButton = Template.bind({});
