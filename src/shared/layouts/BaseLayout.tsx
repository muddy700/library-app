import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import { Avatar, Badge, IconButton, Typography } from "@material-tailwind/react";
import { Sidebar } from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

export const BaseLayout = () => {
	const navigate = useNavigate();

	return (
		<div>
			<div className="bg-primary-900 flex justify-between items-center text-white p-1 pl-6">
				<div className="w-full max-w-[13.5rem] flex items-center justify-between ">
					<Typography variant="h3" className="hover:cursor-pointer" onClick={() => navigate("/")}>
						LIMS
					</Typography>
					<IconButton variant="text" className="text-white">
						<Bars3Icon className="w-7 h-7" />
					</IconButton>
				</div>
				<div className="flex items-center gap-3">
					<Badge content="5">
						<BellIcon className="w-7 h-7" />
					</Badge>
					<Typography className="ml-5">Mohamed Mfaume</Typography>
					<Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" withBorder={true} className="p-0.5" color="cyan" />
				</div>
			</div>
			<div className="flex">
				<Sidebar />
				<Outlet />
			</div>
		</div>
	);
};
