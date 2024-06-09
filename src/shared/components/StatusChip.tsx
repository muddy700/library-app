import { Chip } from "@material-tailwind/react";
import { size } from "@material-tailwind/react/types/components/chip";
import { ReactNode } from "react";

type ChipProps = {
	value?: ReactNode;
	theme?: boolean;
	size?: size;
};

export const StatusChip = ({ value = "value", size = "sm", theme = true }: ChipProps) => {
	const color = theme ? "green" : "red";
	const dotColor = theme ? "bg-green-900" : "bg-red-900";

	return <Chip variant="ghost" color={color} size={size} value={value} icon={<span className={`${dotColor} mx-auto mt-1 block h-2 w-2 rounded-full content-['']`} />} />;
};
