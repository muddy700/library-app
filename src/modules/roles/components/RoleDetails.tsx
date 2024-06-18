import { InboxIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { useRoleInfo } from "@lims/shared/hooks";
import { Page } from "@lims/shared/layouts";
import { IError, NavigationPath } from "@lims/shared/types";
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { BasicInfo, PermissionsList } from ".";
import { routeService } from "@lims/shared/services";

type DetailsTab = { label: string; value: string; icon: ReactNode; content: ReactNode };

export const RoleDetails = () => {
	const { roleId } = useParams();
	const { isLoading, data: roleInfo, error: fetchingError } = useRoleInfo(roleId ?? "--");

	const navPaths: NavigationPath[] = [{ label: "roles", url: routeService.roles.list }, { label: "role-details" }];

	const getApiError = () => (fetchingError ? (fetchingError as unknown as IError) : undefined);

	const tabsList: DetailsTab[] = [
		{ label: "Basic Info", value: "role", icon: <InboxIcon className="w-5 h-5" strokeWidth={2} />, content: <BasicInfo role={roleInfo} /> },
		{ label: "Permissions", value: "permissions", icon: <LockOpenIcon className="w-5 h-5" strokeWidth={2} />, content: <PermissionsList permissions={roleInfo?.permissions} /> },
	];

	return (
		<Page title="Role Details" subTitle="View details of a single role" paths={navPaths} errorInfo={getApiError()} isLoading={isLoading}>
			<Tabs value="role">
				<TabsHeader className="bg-primary-900">
					{tabsList.map(({ label, value, icon }) => (
						<Tab key={value} value={value}>
							<div className="flex items-center gap-2 font-bold">
								{icon}
								{label}
							</div>
						</Tab>
					))}
				</TabsHeader>
				<TabsBody animate={{ initial: { y: 250 }, mount: { y: 0 }, unmount: { y: 250 } }}>
					{tabsList.map(({ value, content }) => (
						<TabPanel key={value} value={value}>
							{content}
						</TabPanel>
					))}
				</TabsBody>
			</Tabs>{" "}
		</Page>
	);
};
