import { Page } from "@lims/shared/layouts";
import { AdminDashboard } from "./components";
import { NavigationPath } from "@lims/shared/types";

export const DashboardModule = () => {
	const navPaths: NavigationPath[] = [{ label: "dashboard" }];

	return <Page title="Dashboard" subTitle="Application summary" paths={navPaths} children={<AdminDashboard />} />;
};
