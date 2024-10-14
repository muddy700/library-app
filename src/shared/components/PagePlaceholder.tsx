import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Typography } from "@material-tailwind/react";

type PlaceholderProps = { isOpen?: boolean; };

export const PagePlaceholder = ({ isOpen = false }: PlaceholderProps) => {
	if (!isOpen) return;
	
	return (
		<div className="flex flex-col items-center gap-5 mt-40">
			<DocumentMagnifyingGlassIcon className="w-28 h-28" strokeWidth={0.7} />
			<Typography className="font-normal">No data to display.</Typography>
		</div>
	);
};
