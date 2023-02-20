import { Meta, StoryObj } from "@storybook/react";
import Card from "../components/Card";

const meta: Meta<typeof Card> = {
  title: "components/Card",
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const ListWithDetails: Story = {
  args: {
    data: {
    title: "My epic List",
    dateCreated: "2022-11-23",
    itemCount: 5,
    }
  }
};
export const ListWithoutDetails: Story = {
  args: {
    data: {
    title: "My epic List",
    }
  }
};
export const CreateList: Story = { args: {} };
