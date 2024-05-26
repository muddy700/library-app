import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col gap-3 items-center justify-center h-[100vh]">
			<Typography variant="h4">This is a login page</Typography>
			<Button onClick={() => navigate("/")}>Login</Button>
		</div>
	);
};
