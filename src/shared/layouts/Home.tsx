import {
	PresentationChartBarIcon,
	InboxIcon,
	Cog6ToothIcon,
	Bars3Icon,
	BellIcon,
	ChevronDownIcon,
	UsersIcon,
	BookOpenIcon,
	RectangleGroupIcon,
	RectangleStackIcon,
} from "@heroicons/react/24/outline";
import { Accordion, AccordionBody, AccordionHeader, Avatar, Badge, Card, IconButton, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";
import { DashboardModule, TasksModule, UsersModule } from "@lims/modules";
import { useState } from "react";

export const Home = () => {
	const [openReports, setOpenReports] = useState<boolean>(false);
	return (
		<div>
			<div className="bg-primary-900 flex justify-between items-center text-white p-1 pl-6">
				<div className="w-full max-w-[13.5rem] flex items-center justify-between ">
					<Typography variant="h3">LIMS</Typography>
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
				<Card className="h-[calc(100vh-2rem)] w-full max-w-[15rem] p-2 shadow-xl shadow-primary-900/25 bg-secondary-100">
					<List>
						<ListItem>
							<ListItemPrefix>
								<RectangleGroupIcon className="h-5 w-5" />
							</ListItemPrefix>
							Dashboard
						</ListItem>
						<ListItem>
							<ListItemPrefix>
								<BookOpenIcon className="h-5 w-5" />
							</ListItemPrefix>
							Books
						</ListItem>
						<ListItem>
							<ListItemPrefix>
								<UsersIcon className="h-5 w-5" />
							</ListItemPrefix>
							Users
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
				{/* <TasksModule /> */}
				{/* <DashboardModule /> */}
				<UsersModule />
			</div>
		</div>
	);
};
