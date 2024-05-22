import { Spinner, Typography } from "@material-tailwind/react";

export const Loader = () => {
	return (
		<div className="flex flex-col items-center gap-5">
			<Spinner className="w-12 h-12" color="teal" />
			<Typography className="italic font-normal">Please Wait...</Typography>
		</div>
	);
};
