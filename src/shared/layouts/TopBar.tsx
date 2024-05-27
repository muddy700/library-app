import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import { Typography, IconButton, Badge } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ProfileMenu } from "./ProfileMenu";

export const TopBar = () => {
	const navigate = useNavigate();

	return (
		<div className="bg-primary-900 flex justify-between items-center text-white p-1 pl-6">
			<div className="w-full max-w-[13.5rem] flex items-center justify-between ">
				{/* Logo */}
				<Typography variant="h3" className="hover:cursor-pointer" onClick={() => navigate("/")}>
					LIMS
				</Typography>

				{/* Menu toggler */}
				<IconButton variant="text" className="text-white">
					<Bars3Icon className="w-7 h-7" />
				</IconButton>
			</div>
			<div className="flex items-center gap-3">
				{/* Notification Badge */}
				<Badge content="5">
					<BellIcon className="w-7 h-7" />
				</Badge>

				{/* User name */}
				<Typography className="ml-5 font-medium">Mohamed Mfaume</Typography>

				{/* Profile menu */}
				<ProfileMenu />
			</div>
		</div>
	);
};
