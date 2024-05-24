import { Dialog } from "@material-tailwind/react";
import { size } from "@material-tailwind/react/types/components/dialog";
import { ReactNode } from "react";

type DialogProps = {
	isOpen?: boolean;
	size?: size;
	className?: string;
	children: ReactNode;
};

export const DataDialog = ({ isOpen = true, className, size = "sm", children }: DialogProps) => {
	const handler = (): void => console.log("LIMS ==> Dialog Handler Called.");

	return (
		<Dialog className={className} open={isOpen} handler={handler} size={size}>
			{children}
		</Dialog>
	);
};
