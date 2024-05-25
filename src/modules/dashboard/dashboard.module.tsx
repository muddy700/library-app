import { Page } from "@lims/shared/layouts";
import { AdminDashboard } from "./components";

export const DashboardModule = () => {
	return <Page title="Dashboard" subTitle="Application summary" path={["Public", "Dashboard"]} children={<AdminDashboard />} />;
};
