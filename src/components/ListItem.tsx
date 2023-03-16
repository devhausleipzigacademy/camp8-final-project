import { Transition } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
import { Tick } from "./Tick";
import {
	LeadingActions,
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

type ListItemProps = {
	name: string;
	image: string;
	quantity?: string;
	checked: boolean;
	clicked: boolean;
	onRemove: () => void;
};
// onRemove is added so higher level page can trigger a function when an item is removed.
export default function ListItem(props: ListItemProps) {
	const [clicked, setClicked] = useState(false);
	const [checked, setChecked] = useState(false);
	const [swiped, setSwiped] = useState(true);
	const onCheck = () => {
		setChecked(!checked);
	};
	const onClicked = () => {
		setClicked(!clicked);
	};
	const onDelete = () => {
		setSwiped(false);
		props.onRemove();
	};
	const leadingActions = () => (
		<LeadingActions>
			<SwipeAction onClick={onCheck} Tag="div">
				<div
					id="Tick_Action"
					className="w-full h-full bg-ux-success button-bold text-text-white flex items-center"
				>
					Tick
				</div>
			</SwipeAction>
		</LeadingActions>
	);
	const trailingActions = () => (
		<TrailingActions>
			<SwipeAction onClick={onDelete} Tag="div">
				<div
					id="Delete_Action"
					className=" bg-ux-error button-bold text-text-white flex items-center justify-center text-left"
				>
					<p>Delete</p>
				</div>
			</SwipeAction>
		</TrailingActions>
	);

	return (
		<Transition
			show={swiped}
			appear={true}
			enter="transform transition duration-[400ms]"
			enterFrom="opacity-0 scale-y-0"
			enterTo="opacity-100 scale-y-100"
			leave="transform duration-[400ms] transition ease-in-out"
			leaveFrom="opacity-100 scale-y-100 "
			leaveTo="opacity-0 scale-y-0 "
		>
			<SwipeableListItem
				className="max-w-[354px] h-16 bg-primary-transparent border border-secondary-default rounded-md flex flex-row"
				leadingActions={leadingActions()}
				trailingActions={trailingActions()}
				threshold={0.5}
			>
				<img
					className="h-full aspect-square"
					src={
						props.image
							? props.image
							: "http://cdn.onlinewebfonts.com/svg/img_275679.png"
					}
					alt="http://cdn.onlinewebfonts.com/svg/img_275679.png"
				/>
				<div className="flex p-2 justify-between items-center flex-grow">
					<p className="text-text-typo text-primary">{props.name}</p>
					<p className="text-secondary font-thin">{props.quantity}</p>
					<div
						onClick={onCheck}
						className="h-10 w-10 bg-text-white border-primary-default-Solid rounded-2xl border-2 flex justify-center items-center"
					>
						<Transition
							show={checked}
							enter="transform transition duration-[400ms]"
							enterFrom="opacity-0 rotate-[-120deg] scale-50"
							enterTo="opacity-100 rotate-0 scale-100"
							leave="transform duration-200 transition ease-in-out"
							leaveFrom="opacity-100 rotate-0 scale-100 "
							leaveTo="opacity-0 scale-95 "
						>
							<Tick classes="w-8 h-8 text-primary-default-Solid" />
						</Transition>
					</div>
				</div>
			</SwipeableListItem>
		</Transition>
	);
}
