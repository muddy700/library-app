import { Spinner, Typography } from "@material-tailwind/react";

type LoaderProps = { isLoading?: boolean };

export const Loader = ({ isLoading = true }: LoaderProps) => {
	if (!isLoading) return;

	return (
		<div className="flex flex-col items-center gap-5">
			<Spinner className="w-12 h-12" color="teal" />
			<Typography className="italic font-normal">Please Wait...</Typography>
		</div>
	);
};
