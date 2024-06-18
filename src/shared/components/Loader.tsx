import { Spinner } from "@material-tailwind/react";

type LoaderProps = { isLoading?: boolean; className?: string };

export const Loader = ({ isLoading = true, className = "" }: LoaderProps) => {
	if (!isLoading) return;

	return (
		<div className={"flex items-center justify-center " + className}>
			<Spinner className="w-12 h-12" color="teal" />
		</div>
	);
};
