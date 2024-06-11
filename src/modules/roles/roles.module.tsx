import { Navigate, Route, Routes } from "react-router-dom";
import { RolesList } from "./components";
import { PageNotFound } from "@lims/shared/components";

export const RolesModule = () => {
	return (
		<Routes>
			<Route index element={<Navigate to={"list"} />} />
			<Route path="list" element={<RolesList />} />
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
};
