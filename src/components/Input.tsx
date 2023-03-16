export default function Input() {
	return (
		<>
			<div className="flex">
				<input
					className="w-80 h-14 flex text-center  border border-primary-default-Solid focus:outline-none  hover:border-primary-default-Solid active:border-primary-default-Solid invalid:border-ux-error invalid:border-2
					  rounded-md "
					type="email"
					placeholder="Email"
				/>
			</div>
		</>
	);
}
