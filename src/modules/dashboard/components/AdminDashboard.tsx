import { useEffect, useState } from "react";
import { SummaryCard } from "../types";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { BookOpenIcon, Cog6ToothIcon, LockOpenIcon, UsersIcon } from "@heroicons/react/24/outline";

const dashCards: SummaryCard[] = [
	{ title: "Users", value: 120, icon: <UsersIcon className="w-5 h-5" /> },
	{ title: "Books", value: 450, icon: <BookOpenIcon className="w-5 h-5" /> },
	{ title: "Roles", value: 3, icon: <Cog6ToothIcon className="w-5 h-5" /> },
	{ title: "Permissions", value: 120, icon: <LockOpenIcon className="w-5 h-5" /> },
];

export const AdminDashboard = () => {
	const [summaryCards, setSummaryCards] = useState<SummaryCard[]>([]);

	useEffect(() => setSummaryCards(dashCards), []);

	return (
		<div className="flex flex-col gap-3">
			<div className="grid grid-cols-4 gap-4">
				{summaryCards.map((card) => (
					<Card className="group text-primary-900 border-b-2 border-primary-900 hover:bg-primary-900">
						<CardBody className="group-hover:text-white group-hover:cursor-pointer ">
							<div className="flex justify-between items-center">
								<Typography className="" variant="h6">
									{card.title}
								</Typography>
								{card.icon}
							</div>
							<Typography className="font-medium">{card.value}</Typography>
						</CardBody>
					</Card>
				))}
			</div>
		</div>
	);
};
