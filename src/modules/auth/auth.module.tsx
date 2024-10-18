import { Route, Routes } from "react-router-dom";
import { EmailVerification, Login, PasswordSetup } from "./components";

export const AuthModule = () => {
	return (
		<Routes>
			<Route path="login" element={<Login />} />
			<Route path="verify-email" element={<EmailVerification />} />
			<Route path="password-setup" element={<PasswordSetup />} />
		</Routes>
	);
};
