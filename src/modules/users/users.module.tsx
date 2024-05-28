import { UserDetails, UsersList } from "./components";
import { Navigate, Route, Routes } from "react-router-dom";

export const UsersModule = () => {
	return (
		<Routes>
			<Route index element={<Navigate to={"list"} />} />
			<Route path="list" element={<UsersList />} />
			<Route path=":userId/details" element={<UserDetails />} />
		</Routes>
	);
};
