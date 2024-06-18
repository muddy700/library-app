import { Navigate, Route, Routes } from "react-router-dom";
import { RoleDetails, RolesList } from "./components";
import { PageNotFound } from "@lims/shared/components";

export const RolesModule = () => {
	return (
		<Routes>
			<Route index element={<Navigate to={"list"} />} />
			<Route path="list" element={<RolesList />} />
			<Route path=":roleId/details" element={<RoleDetails />} />
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
};
