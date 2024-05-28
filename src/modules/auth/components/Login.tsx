import { Button, Card, Chip, Input, Typography } from "@material-tailwind/react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState<string>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const login = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
			setErrorMessage("Invalid username or password");

			setTimeout(() => navigate("/"), 1000);
		}, 2000);
	};

	return (
		<div className="h-[100vh] flex items-center justify-center bg-secondary-200">
			<Card className="w-1/2 grid grid-cols-10">
				{/* Logo */}
				<div className="bg-primary-900 col-span-3 rounded-l-xl text-white flex items-center justify-center">
					<Typography variant="h1">LIMS</Typography>
				</div>

				{/* Login Form: Start */}
				<form onSubmit={login} className="col-span-7 rounded-r-xl px-20 flex flex-col gap-8 py-10">
					<Chip
						open={errorMessage !== undefined}
						animate={{ mount: { y: 0 }, unmount: { y: 50 } }}
						value={errorMessage}
						variant="outlined"
						size="lg"
						className="text-red-400 border-red-400 capitalize font-medium text-center bg-red-200/25 py-3"
					/>
					<Input label="Email" size="lg" color="teal" required />
					<Input label="Password" size="lg" color="teal" required />
					<div className="flex flex-col gap-5 mt-10">
						<Button loading={isLoading} className="bg-primary-900 justify-center capitalize text-sm" type="submit">
							{isLoading ? "Loading..." : "Log In"}
						</Button>
						<Typography variant="small" className="place-self-end text-primary-900 font-normal hover:cursor-pointer">
							Forgot your password?
						</Typography>
					</div>
				</form>
				{/* Login Form: End */}
			</Card>
		</div>
	);
};
