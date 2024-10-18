import { Button, Card, Chip, Input, Typography } from "@material-tailwind/react";
import { FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginDto, LoginSchema } from "../schemas";
import { apiService, storageService, utilService } from "@lims/shared/services";
import { AuthInfo } from "../types";
import { IError } from "@lims/shared/types";
import { useMutation } from "@tanstack/react-query";

export const Login = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const initialFormData: LoginDto = {
		email: searchParams.get("email") ?? "",
		password: "",
	};

	const [errorMessage, setErrorMessage] = useState<string>("");
	const [loginPayload, setLoginPayload] = useState<LoginDto>(initialFormData);

	const { mutate, isPending, data, error: responseError, reset } = useMutation({ mutationFn: (payload: LoginDto) => apiService.post<AuthInfo, LoginDto>("/auth/login", payload) });

	const handleFormChanges = (e: FormEvent<HTMLInputElement>) => {
		const { name: fieldName, value } = e.currentTarget;

		reset();
		setErrorMessage("");

		setLoginPayload({ ...loginPayload, [fieldName]: value } as LoginDto);
	};

	const validateCredentials = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		LoginSchema.safeParse(loginPayload).success ? mutate(loginPayload) : setErrorMessage("Invalid username or password");
	};

	if (responseError && !errorMessage) setErrorMessage((responseError as unknown as IError).description);

	if (data && "token" in data) {
		const { AUTH_INFO, PREVIOUS_LOCATION } = utilService.constants;

		storageService.save(AUTH_INFO, JSON.stringify(data));
		navigate(storageService.get<string>(PREVIOUS_LOCATION) ?? "/");

		setTimeout(() => storageService.remove(PREVIOUS_LOCATION), 1000);
	}

	const hasError = () => !utilService.isNull(errorMessage);

	return (
		<div className="h-[100vh] flex items-center justify-center bg-secondary-200">
			<Card className="w-1/2 grid grid-cols-10">
				{/* Logo */}
				<div className="bg-primary-900 col-span-3 rounded-l-xl text-white flex items-center justify-center">
					<Typography variant="h1">LIMS</Typography>
				</div>

				{/* Login Form: Start */}
				<form onSubmit={validateCredentials} className="col-span-7 rounded-r-xl px-20 flex flex-col gap-8 py-10">
					{/* Chip for displaying form errors */}
					{!utilService.isNull(errorMessage) && (
						<Chip
							animate={{ mount: { y: 0 }, unmount: { y: 50 } }}
							value={errorMessage}
							variant="outlined"
							size="lg"
							className="text-red-400 border-red-400 capitalize font-medium text-center bg-red-200/25 py-3"
						/>
					)}

					<Input type="email" name="email" label="Email" size="lg" color="teal" value={loginPayload.email} onChange={handleFormChanges} required error={hasError()} />
					<Input type="password" name="password" label="Password" size="lg" color="teal" value={loginPayload.password} onChange={handleFormChanges} required error={hasError()} />

					<div className="flex flex-col gap-5 mt-10">
						<Button loading={isPending} className="bg-primary-900 justify-center capitalize text-sm" type="submit">
							{isPending ? "Loading..." : "Log In"}
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
