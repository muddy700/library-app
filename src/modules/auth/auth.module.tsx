import { Route, Routes } from "react-router-dom";
import { Login } from "./components";

export const AuthModule = () => {
	return (
		<Routes>
			<Route path="login" element={<Login />} />
		</Routes>
	);
};
