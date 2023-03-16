export default function Input() {
	return (
		<>
			<div className="flex justify-center">
				<input
					className="w-80 h-14 text-center border border-primary-default-Solid focus:outline-none  hover:border-primary-default-Solid active:border-primary-default-Solid invalid:border-ux-error invalid:border-2
					  rounded-md "
					type="email"
					placeholder="Email"
				/>
			</div>
		</>
	);
}
