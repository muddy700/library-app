import { PageNotFound } from "@lims/shared/components";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuditTrailsList } from "./components";

export const AuditTrailsModule = () => {
	return (
		<Routes>
			<Route index element={<Navigate to={"list"} />} />
			<Route path="list" element={<AuditTrailsList />} />
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
};
