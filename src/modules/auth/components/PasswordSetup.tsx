import { FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChangePasswordDto, ChangePasswordSchema } from "../schemas";
import { useMutation } from "@tanstack/react-query";
import { apiService, formService, routeService, storageService, utilService } from "@lims/shared/services";
import { IError, Success, Validation } from "@lims/shared/types";
import { Button, Card, Chip, Typography } from "@material-tailwind/react";
import { ZodError } from "zod";
import { TextInput } from "@lims/shared/components/form";

export const PasswordSetup = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const initialFormData: ChangePasswordDto = {
		oldPassword: searchParams.get("token") ?? "",
		newPassword: "",
		confirmPassword: "",
	};

	const [formErrors, setFormErrors] = useState<Validation[]>([]);
	const [formData, setFormData] = useState<ChangePasswordDto>(initialFormData);

	const {
		mutate,
		isPending,
		data,
		error: mutationError,
		reset,
	} = useMutation({ mutationFn: (payload: ChangePasswordDto) => apiService.post<Success, ChangePasswordDto>("/auth/change-password", payload) });

	const onInputChange = ({ currentTarget: target }: FormEvent<HTMLInputElement>) => updateFormData(target.name, target.value);

	const updateFormData = (fieldName: string, value?: string) => {
		reset();

		setFormData({ ...formData, [fieldName]: value } as ChangePasswordDto);
		formService.removeInputError(fieldName, formErrors, setFormErrors);
	};

	const validateForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			ChangePasswordSchema.parse(formData);
			mutate(formData);
		} catch (error) {
			setFormErrors(formService.extractErrors(error as ZodError));
		}
	};

	const getErrorMessage = (fieldName: string) => formService.getErrorMessage(fieldName, formErrors);

	const getApiError = () => (mutationError ? (mutationError as unknown as IError) : undefined);

	if (data)
		setTimeout(() => {
			// Clear form
			setFormData({ ...initialFormData, oldPassword: "" });

			reset();
			storageService.remove(utilService.constants.AUTH_INFO);

			navigate(routeService.auth.login + "?email=" + searchParams.get("email"));
		}, 3000);

	// For notification chip
	const showChip = () => !utilService.isNull(getApiError()) || data;
	const getChipMessage = () => getApiError()?.description || data?.message;
	const customStyles = data ? "text-green-600 border-green-600 bg-green-200/25" : "text-red-400 border-red-400 bg-red-200/25";

	return (
		<div className="h-[100vh] flex items-center justify-center bg-secondary-200">
			<Card className="w-1/2 grid grid-cols-10">
				{/* Logo */}
				<div className="bg-primary-900 col-span-3 rounded-l-xl text-white flex items-center justify-center">
					<Typography variant="h1">LIMS</Typography>
				</div>

				{/* Password Setup Form: Start */}
				<form onSubmit={validateForm} className="col-span-7 rounded-r-xl px-20 flex flex-col gap-8 py-10">
					{/* Chip for displaying form errors */}
					{showChip() && (
						<Chip
							animate={{ mount: { y: 0 }, unmount: { y: 50 } }}
							value={getChipMessage()}
							variant="outlined"
							size="lg"
							className={customStyles + " capitalize font-medium text-center py-3"}
						/>
					)}

					<TextInput type="password" label="New Password" onChange={onInputChange} getErrorMessage={getErrorMessage} value={formData.newPassword} />
					<TextInput type="password" label="Confirm Password" onChange={onInputChange} getErrorMessage={getErrorMessage} value={formData.confirmPassword} />

					<Button loading={isPending} className="bg-primary-900 justify-center capitalize text-sm mt-10" type="submit">
						{isPending ? "Loading..." : "Submit"}
					</Button>
				</form>
				{/* Password Setup Form: End */}
			</Card>
		</div>
	);
};
