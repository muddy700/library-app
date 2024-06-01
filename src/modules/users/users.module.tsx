import { Create, Update, UserDetails, UsersList } from "./components";
import { Navigate, Route, Routes } from "react-router-dom";

export const UsersModule = () => {
	return (
		<Routes>
			<Route index element={<Navigate to={"list"} />} />
			<Route path="list" element={<UsersList />} />
			<Route path="create" element={<Create />} />
			<Route path=":userId/details" element={<UserDetails />} />
			<Route path=":userId/update" element={<Update />} />
		</Routes>
	);
};
