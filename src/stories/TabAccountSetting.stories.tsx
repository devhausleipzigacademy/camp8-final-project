import { Meta, StoryObj } from "@storybook/react";
import TabAccountSetting from "@/components/TabAccountSetting";

const meta: Meta<typeof TabAccountSetting> = {
  title: "components/TabAccountSetting",
  component: TabAccountSetting,
};

export default meta;

type Story = StoryObj<typeof TabAccountSetting>;

export const Default: Story = {};
