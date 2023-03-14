export default function Input() {
	return (
		<>
			<div className="relative">
				<input
					className="w-80 h-14 px-4 flex text-center m-3 border valid:border-primary-default-Solid valid:border-2 invalid:border-ux-error invalid:border-2
					  rounded-md "
					type="email"
					placeholder="Email"
				/>
			</div>
		</>
	);
}
