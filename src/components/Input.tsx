export default function Input() {
	return (
		<>
			<label className="relative">
				<input
					className="flex items-center text-center gap-3 pr-8 border border-primary-default-background focus:border-2 invalid:border-ux-error invalid:border-2
					  rounded-md py-3 px-5 w-full"
					type="email"
					placeholder="Email"
				/>
			</label>
		</>
	);
}
