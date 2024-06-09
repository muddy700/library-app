import { UserCircleIcon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/outline";
import { Menu, MenuHandler, Button, Avatar, MenuList, MenuItem, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routeService, storageService, utilService } from "../services";

export const ProfileMenu = () => {
	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const closeMenu = () => setIsMenuOpen(false);
	const menuItemClasses: string = "flex items-center gap-2 rounded";

	const logout = () => {
		storageService.remove(utilService.constants.AUTH_INFO);
		navigate(routeService.auth.login);
	};

	return (
		<Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
			<MenuHandler>
				<Button variant="text" className="p-0.5">
					<Avatar
						alt="Profile photo"
						className="border border-primary-400 p-0.5"
						src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
					/>
				</Button>
			</MenuHandler>
			<MenuList className="p-1 text-primary-900">
				<MenuItem onClick={closeMenu} className={menuItemClasses}>
					<UserCircleIcon className="h-4 w-4" strokeWidth={2} />
					<Typography as="span" variant="small" className="font-normal">
						My Profile
					</Typography>
				</MenuItem>
				<MenuItem onClick={closeMenu} className={menuItemClasses}>
					<Cog6ToothIcon className="h-4 w-4" strokeWidth={2} />
					<Typography as="span" variant="small" className="font-normal">
						Edit Profile
					</Typography>
				</MenuItem>
				<MenuItem onClick={() => logout()} className={`group text-red-500 ${menuItemClasses}`}>
					<PowerIcon className="h-4 w-4 text-red-500" strokeWidth={2} />
					<Typography as="span" variant="small" className="font-normal group-hover:text-red-500">
						Sign Out
					</Typography>
				</MenuItem>
			</MenuList>
		</Menu>
	);
};
