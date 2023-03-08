import { Meta, StoryObj } from "@storybook/react";
import { PlusButton } from "../components/PlusButton";


const meta: Meta<typeof PlusButton> = {
  title: "components/PlusButton",
  component: PlusButton,
};

export default meta;

type Story = StoryObj<typeof PlusButton>;

export const Default: Story = {};
