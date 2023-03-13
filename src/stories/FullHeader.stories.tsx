import { Meta, StoryObj } from "@storybook/react";
import { FullHeader } from "../components/FullHeader";

const meta: Meta<typeof FullHeader> = {
  title: "components/FullHeader",
  component: FullHeader,
};

export default meta;

type Story = StoryObj<typeof FullHeader>;

export const Default: Story = {};
