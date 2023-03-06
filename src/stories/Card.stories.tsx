import { Meta, StoryObj } from "@storybook/react";
import Card from "../components/Card";

const meta: Meta<typeof Card> = {
  title: "components/Card",
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

// construct a date 3 days ago and today to check in the component
const today = new Date();
let christmasDay = new Date(2022, 11, 23);

export const List: Story = {
  args: {
    data: {
      title: "Weihnachten",
      dateCreated: christmasDay,
      totalItems: 19,
      checkedItems: 18,
    },
  },
};
export const ListFavorited: Story = {
  args: {
    data: {
      title: "Weihnachten",
      dateCreated: christmasDay,
      totalItems: 19,
      checkedItems: 18,
    },
    favorite: true,
  },
};
export const ListInCreation: Story = {
  args: {
    data: {
      dateCreated: today,
      totalItems: 0,
      checkedItems: 0,
    },
    createNewCard: true,
  },
};
