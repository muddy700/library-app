import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { TopBar } from "./TopBar";

export const BaseLayout = () => {
	return (
		<div>
			<TopBar />
			<main className="flex">
				<Sidebar />
				<Outlet />
			</main>
		</div>
	);
};
