import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import EditModal from "@/pages/list/EditModal";

interface EditModalProps {
	/**
	 * Is this the principal call to action on the page?
	 */
	primary?: boolean;
	secondary?: boolean;
	/**
	 * What background color to use
	 */
	backgroundColor?: string;
	/**
  
   * Tabs contents
   */
	label: string;
	/**
	 * Optional click handler
	 */
	onClick?: () => void;
}

export default {
	title: "Example/EditModal",
	component: EditModal,
	argTypes: {
		backgroundColor: { control: "color" },
	},
} as ComponentMeta<typeof EditModal>;

const Template: ComponentStory<typeof EditModal> = (args) => (
	<EditModal {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
	primary: true,
	label: "close",
};

export const Secondary = Template.bind({});
Secondary.args = {
	label: "open",
};
