import styles from "@/styles/Home.module.css";
import { useState } from "react";

import { Meta, StoryObj } from "@storybook/react";
import EditModal from "../pages/list/EditModal";

const meta: Meta<typeof EditModal> = {
	title: "components/EditModal",
	component: EditModal,
};

export default meta;

type Story = StoryObj<typeof EditModal>;

export const Default: Story = {};
