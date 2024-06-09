import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import { Typography, IconButton, Badge } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ProfileMenu } from "./ProfileMenu";
import { authService } from "../services";

export const TopBar = () => {
	const navigate = useNavigate();
	const user = authService.getPrincipal();

	const getDisplayName = () => {
		if (!user) return user;

		const names = user?.fullName.split(" ");

		if (names.length === 1) return names[0];

		return names[0] + " " + names[names.length - 1];
	};

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
				<Typography className="ml-5 font-medium">{getDisplayName() ?? "Guest User"}</Typography>

				{/* Profile menu */}
				<ProfileMenu />
			</div>
		</div>
	);
};
