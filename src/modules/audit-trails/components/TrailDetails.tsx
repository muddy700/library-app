import { Page } from "@lims/shared/layouts";
import { IError, NavigationPath } from "@lims/shared/types";
import { useNavigate, useParams } from "react-router-dom";
import { apiService, routeService, utilService } from "@lims/shared/services";
import { useQuery } from "@tanstack/react-query";
import { AuditTrail } from "../types";
import { PropertyDiv } from "@lims/shared/components";
import { Button } from "@material-tailwind/react";
import { TraceActionEnum, TrailActionEnum } from "../enums";

export const TrailDetails = () => {
	const { CREATE, UPDATE } = TrailActionEnum;
	const { ACTOR, RESOURCE } = TraceActionEnum;

	const { trailId } = useParams();
	const { isLoading, data, error } = useQuery({ queryKey: ["audit-trail", trailId], queryFn: () => apiService.getById<AuditTrail>("/audit-trails", trailId ?? "--") });

	const navigate = useNavigate();
	const navPaths: NavigationPath[] = [{ label: "audit-trails", url: routeService.auditTrails.list }, { label: "trail-details" }];

	const getApiError = () => (error ? (error as unknown as IError) : undefined);

	const actionHandler = (action: TraceActionEnum) => {
		if (action === ACTOR) navigate(routeService.users.details(data?.user.id ?? "--"));
		else if (action === RESOURCE) {
			const { resourceId, resourceName } = data as AuditTrail;

			if (resourceName === "User") navigate(routeService.users.details(resourceId));
			else if (resourceName === "Book") navigate(routeService.books.details(resourceId));
			else if (resourceName === "Role") navigate(routeService.roles.details(resourceId));
			else navigate(routeService.dashboard.index);
		}
	};

	return (
		<Page
			title="Trail Details"
			subTitle="View details of a single audit-trail"
			paths={navPaths}
			errorInfo={getApiError()}
			isLoading={isLoading}
			className="flex flex-col gap-5 text-primary-900/90"
		>
			<div className="flex justify-between">
				<PropertyDiv label={"Full Name"} value={data?.user.fullName} />
				<PropertyDiv label={"Email"} value={data?.user.email} />
				<div className="w-2/5 flex justify-between">
					<PropertyDiv label={"Activity"} value={data?.action} />
					<PropertyDiv label={"Resource Name"} value={data?.resourceName} />
					<PropertyDiv label={"Time"} value={utilService.formatDate(data?.createdAt ?? "--")} />
				</div>
			</div>

			<PropertyDiv label={"Previous Values"} value={data?.previousValues ?? "--"} />
			<PropertyDiv label={"Updated Values"} value={data?.updatedValues} />

			{/* Action Buttons */}
			<div className="flex gap-5 justify-center">
				<Button variant="outlined" onClick={() => actionHandler(ACTOR)} className="text-primary-600 border-primary-600 ">
					View Actor
				</Button>
				{(data?.action === CREATE || data?.action === UPDATE) && (
					<Button onClick={() => actionHandler(RESOURCE)} className="bg-primary-600">
						View Resource({data?.resourceName})
					</Button>
				)}
			</div>
		</Page>
	);
};
