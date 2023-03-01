import { Meta, StoryObj } from "@storybook/react";
import { HeaderTitle } from "../components/HeaderTitle";

const meta: Meta<typeof HeaderTitle> = {
  title: "components/HeaderTitle",
  component: HeaderTitle,
};

export default meta;

type Story = StoryObj<typeof HeaderTitle>;

export const Default: Story = {};
