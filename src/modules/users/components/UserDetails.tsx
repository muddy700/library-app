import { InboxIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Page } from "@lims/shared/layouts";
import { NavigationPath, User } from "@lims/shared/types";
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import { ReactNode } from "react";
// import { useParams } from "react-router-dom";
import { ProfileInfo } from "./ProfileInfo";
import { dummyDataService } from "@lims/shared/services";

type DetailsTab = { label: string; value: string; icon: ReactNode; content: ReactNode };

export const UserDetails = () => {
	// const { userId } = useParams();
	const userInfo: User = dummyDataService.userDetails;

	const navPaths: NavigationPath[] = [{ label: "users", url: "/users" }, { label: "user-details" }];

	const tabsList: DetailsTab[] = [
		{
			label: "Profile",
			value: "profile",
			icon: <UserCircleIcon className="w-5 h-5" strokeWidth={2} />,
			content: <ProfileInfo data={userInfo} />,
		},
		{
			label: "Role",
			value: "role",
			icon: <InboxIcon className="w-5 h-5" strokeWidth={2} />,
			content: <p>Role info</p>,
		},
		{
			label: "Permissions",
			value: "permissions",
			icon: <LockOpenIcon className="w-5 h-5" strokeWidth={2} />,
			content: <p>Permissions Info</p>,
		},
	];

	return (
		<Page title="User Details" subTitle="View details of a single user" paths={navPaths}>
			<Tabs value="profile">
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
				<TabsBody
					animate={{
						initial: { y: 250 },
						mount: { y: 0 },
						unmount: { y: 250 },
					}}
				>
					{tabsList.map(({ value, content }) => (
						<TabPanel key={value} value={value}>
							{content}
						</TabPanel>
					))}
				</TabsBody>
			</Tabs>
		</Page>
	);
};
