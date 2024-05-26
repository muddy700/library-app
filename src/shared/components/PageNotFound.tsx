import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export const PageNotFound = () => {
	const navigate = useNavigate();

	return (
		<div className="w-full flex flex-col gap-5 items-center justify-center">
			<Typography variant="h4">Oops..!</Typography>
			<Typography>Page Not Found</Typography>
			<Button onClick={() => navigate(-1)}>Go Back</Button>
		</div>
	);
};
