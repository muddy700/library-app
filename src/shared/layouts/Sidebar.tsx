import { RectangleGroupIcon, BookOpenIcon, UsersIcon, InboxIcon, ChevronDownIcon, PresentationChartBarIcon, RectangleStackIcon } from "@heroicons/react/24/outline";
import { Card, List, ListItem, ListItemPrefix, Accordion, AccordionHeader, Typography, AccordionBody } from "@material-tailwind/react";
import { ReactNode, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routeService } from "../services";

interface SidebarItem {
	label: string;
	icon: ReactNode;
	route: string;
}

export const Sidebar = () => {
	const [openReports, setOpenReports] = useState<boolean>(false);

	const location = useLocation();
	const navigate = useNavigate();

	const listItemStyles = "hover:text-white hover:bg-primary-900";
	const activeItemStyles = "text-white bg-primary-900 focus:text-white focus:bg-primary-900";

	const isActive = (baseUrl: string) => location.pathname.startsWith(baseUrl);

	const sideItems: SidebarItem[] = [
		{ label: "Dashboard", icon: <RectangleGroupIcon className="h-5 w-5" />, route: routeService.dashboard.index },
		{ label: "Users", icon: <UsersIcon className="h-5 w-5" />, route: routeService.users.list },
		{ label: "Books", icon: <BookOpenIcon className="h-5 w-5" />, route: routeService.books.list },
		{ label: "Roles", icon: <InboxIcon className="h-5 w-5" />, route: routeService.roles.list },
		// { label: "Settings", icon: <Cog6ToothIcon className="h-5 w-5" />, route: routeService.settings.index },
		{ label: "Audit Trails", icon: <RectangleStackIcon className="h-5 w-5" />, route: routeService.auditTrails.list },
	];

	return (
		<Card className="h-[calc(100vh-3.8rem)] w-full max-w-[15rem] shadow-xl shadow-primary-900/25 bg-secondary-100">
			<List>
				{sideItems.map(({ label, icon, route }, index) => (
					<ListItem onClick={() => navigate(route)} className={isActive(route) ? activeItemStyles : listItemStyles} key={index}>
						<ListItemPrefix>{icon}</ListItemPrefix>
						{label}
					</ListItem>
				))}

				<Accordion open={openReports} icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${openReports ? "rotate-180" : ""}`} />}>
					<ListItem className="p-0" selected={openReports}>
						<AccordionHeader onClick={() => setOpenReports(!openReports)} className="border-b-0 p-3 pr-6">
							<ListItemPrefix>
								<PresentationChartBarIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Typography color="blue-gray" className="mr-auto font-normal">
								Reports
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1">
						<List className="p-0 pl-6">
							<ListItem>
								<ListItemPrefix>
									<UsersIcon strokeWidth={3} className="h-3 w-3" />
								</ListItemPrefix>
								<Typography className="font-normal" variant="small">
									Users
								</Typography>
							</ListItem>
							<ListItem>
								<ListItemPrefix>
									<BookOpenIcon strokeWidth={3} className="h-3 w-3" />
								</ListItemPrefix>
								<Typography className="font-normal" variant="small">
									Books
								</Typography>
							</ListItem>
						</List>
					</AccordionBody>
				</Accordion>
			</List>
		</Card>
	);
};
