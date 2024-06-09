import { RectangleGroupIcon, BookOpenIcon, UsersIcon, InboxIcon, Cog6ToothIcon, ChevronDownIcon, PresentationChartBarIcon, RectangleStackIcon } from "@heroicons/react/24/outline";
import { Card, List, ListItem, ListItemPrefix, Accordion, AccordionHeader, Typography, AccordionBody } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routeService } from "../services";

export const Sidebar = () => {
	const [openReports, setOpenReports] = useState<boolean>(false);
	const navigate = useNavigate();

	return (
		<Card className="h-[calc(100vh-3.8rem)] w-full max-w-[15rem] p-2 shadow-xl shadow-primary-900/25 bg-secondary-100">
			<List>
				<ListItem onClick={() => navigate(routeService.dashboard.index)}>
					<ListItemPrefix>
						<RectangleGroupIcon className="h-5 w-5" />
					</ListItemPrefix>
					Dashboard
				</ListItem>
				<ListItem onClick={() => navigate(routeService.users.list)}>
					<ListItemPrefix>
						<UsersIcon className="h-5 w-5" />
					</ListItemPrefix>
					Users
				</ListItem>
				<ListItem onClick={() => navigate(routeService.books.list)}>
					<ListItemPrefix>
						<BookOpenIcon className="h-5 w-5" />
					</ListItemPrefix>
					Books
				</ListItem>
				<ListItem>
					<ListItemPrefix>
						<InboxIcon className="h-5 w-5" />
					</ListItemPrefix>
					Roles
				</ListItem>
				<ListItem>
					<ListItemPrefix>
						<Cog6ToothIcon className="h-5 w-5" />
					</ListItemPrefix>
					Settings
				</ListItem>
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
				<ListItem>
					<ListItemPrefix>
						<RectangleStackIcon className="h-5 w-5" />
					</ListItemPrefix>
					Audit Trail
				</ListItem>
			</List>
		</Card>
	);
};
