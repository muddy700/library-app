import { XMarkIcon } from "@heroicons/react/24/solid";
import { Drawer, IconButton, Typography } from "@material-tailwind/react";
import { ReactNode } from "react";
import { Loader } from "./Loader";

type DrawerProps = {
	title: string;
	subTitle?: string;
	isOpen?: boolean;
	isLoading?: boolean;
	size?: number;
	toggleVisibility: (value: boolean) => void;
	children: ReactNode;
};

export const DataDrawer = ({ title, subTitle, isOpen = true, children, toggleVisibility, size = 450, isLoading = false }: DrawerProps) => {
	return (
		<Drawer size={size} open={isOpen} onClose={() => toggleVisibility(false)} placement="right" className="px-4">
			{/* Header: Start */}
			<div className="flex items-center justify-between pb-2">
				<Typography variant="h5" color="blue-gray">
					{title}
				</Typography>
				<IconButton variant="text" color="blue-gray" onClick={() => toggleVisibility(false)}>
					<XMarkIcon className="w-5 h-5" />
				</IconButton>
			</div>
			{/* Header: End */}

			{/* SubTitle: Start */}
			{subTitle && !isLoading && (
				<div>
					<Typography variant="small" color="gray" className="font-normal ">
						{subTitle}
					</Typography>
				</div>
			)}
			{/* SubTitle: End */}

			{/* Body: Start */}
			<div className="mt-5">{isLoading ? <Loader /> : children}</div>
			{/* Body: End */}
		</Drawer>
	);
};
