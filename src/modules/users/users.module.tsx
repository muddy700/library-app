import { Page } from "@lims/shared/layouts";
import { UsersList } from "./components";

export const UsersModule = () => {
	return <Page title="Users" subTitle="Manage system users" path={["Public", "Users"]} children={<UsersList />} />;
};
