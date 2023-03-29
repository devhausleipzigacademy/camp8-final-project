import { Meta, StoryObj } from "@storybook/react";
import { HeaderWithBack } from "../components/HeaderWithBack";

const meta: Meta<typeof HeaderWithBack> = {
  title: "components/HeaderWithBack",
  component: HeaderWithBack,
};

export default meta;

type Story = StoryObj<typeof HeaderWithBack>;

export const Default: Story = {};
