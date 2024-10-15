import { useState } from "react";
import { AdminSummary, SummaryCard } from "../types";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { BookOpenIcon, Cog6ToothIcon, LockOpenIcon, UsersIcon } from "@heroicons/react/24/outline";
import { apiService, routeService } from "@lims/shared/services";
import { CardSkeleton } from ".";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IError } from "@lims/shared/types";
import { ErrorBanner } from "@lims/shared/components";

const dashboardCards: SummaryCard[] = [
	{ title: "Users", key: "users", value: 0, icon: <UsersIcon className="w-5 h-5" strokeWidth={2} />, route: routeService.users.list },
	{ title: "Books", key: "books", value: 0, icon: <BookOpenIcon className="w-5 h-5" strokeWidth={2} />, route: routeService.books.list },
	{ title: "Roles", value: 0, icon: <Cog6ToothIcon className="w-5 h-5" strokeWidth={2} />, key: "roles", route: routeService.roles.list },
	{ title: "Permissions", value: 0, icon: <LockOpenIcon className="w-5 h-5" strokeWidth={2} />, key: "permissions", route: routeService.settings.index },
];

export const AdminDashboard = () => {
	const { isLoading, data, error } = useQuery<AdminSummary, IError>({ queryKey: ["admin-dashboard-summary"], queryFn: () => apiService.getById<AdminSummary>("/dashboard", "admin") });
	const [summaryCards, setSummaryCards] = useState<SummaryCard[]>([]);

	const navigate = useNavigate();

	if (data && !summaryCards.length) setSummaryCards(dashboardCards.map((item) => ({ ...item, value: data[item.key as never] })));

	if (isLoading)
		return (
			<div className="grid grid-cols-4 gap-4">
				{[1, 2, 3, 4].map((item) => (
					<CardSkeleton key={item} />
				))}
			</div>
		);

	return (
		<>
			{/* Error Banner */}
			<ErrorBanner data={error} />

			{/* Dashboard cards */}
			<div className="flex flex-col gap-3">
				<div className="grid grid-cols-4 gap-4">
					{summaryCards.map((card) => (
						<Card key={card.title} className="group text-primary-900 border-b-2 border-primary-900 hover:bg-primary-900" onClick={() => navigate(card.route ?? "#")}>
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
		</>
	);
};
