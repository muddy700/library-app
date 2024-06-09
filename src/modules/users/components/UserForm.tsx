import { ErrorBanner, SuccessBanner } from "@lims/shared/components";
import { formService, placeholderService, routeService } from "@lims/shared/services";
import { IError, InputOption, Success, Validation } from "@lims/shared/types";
import { Button, Card } from "@material-tailwind/react";
import { useState, FormEvent } from "react";
import { ZodError } from "zod";
import { UserDto, UserSchema } from "../schemas";
import { SelectInput, TextInput } from "@lims/shared/components/form";
import { useNavigate } from "react-router-dom";
import { SuccessActionEnum } from "@lims/shared/enums";
import { UseMutationResult } from "@tanstack/react-query";
import { useRoles } from "@lims/shared/hooks";

type FormProps = {
	initialValues?: UserDto;
	mutation: UseMutationResult<Success, Error, UserDto>;
};

export const UserForm = ({ initialValues, mutation }: FormProps) => {
	const { mutate, isPending, data: successInfo, error: mutationError } = mutation;
	const { isLoading: isFetchingRoles, data: rolesPage, error: fetchingError } = useRoles();

	const [userPayload, setUserPayload] = useState<UserDto>(initialValues ?? placeholderService.userForm);
	const [formErrors, setFormErrors] = useState<Validation[]>([]);

	const genderOptions: InputOption[] = [
		{ label: "Male", value: "M" },
		{ label: "Female", value: "F" },
	];

	const roleOptions = rolesPage ? rolesPage.items.filter(({ active }) => active).map(({ id, name }) => ({ label: name, value: id } as InputOption)) : [];

	const navigate = useNavigate();
	const { ADD_NEW, VIEW_RESOURCE, LIST_RESOURCES } = SuccessActionEnum;
	const successActions = [ADD_NEW, VIEW_RESOURCE, LIST_RESOURCES];

	const onInputChange = ({ currentTarget: target }: FormEvent<HTMLInputElement>) => updatePayload(target.name, target.value);

	const onSelectionChange = (fieldName: string, value?: string) => updatePayload(fieldName, value);

	const updatePayload = (fieldName: string, value?: string) => {
		setUserPayload({ ...userPayload, [fieldName]: value } as UserDto);
		formService.removeInputError(fieldName, formErrors, setFormErrors);
	};

	const validateForm = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		try {
			UserSchema.parse(userPayload);
			mutate(userPayload);
		} catch (error) {
			setFormErrors(formService.extractErrors(error as ZodError));
		}
	};

	const handleSuccessActions = (actionId: SuccessActionEnum) => {
		// View details of the created/updated user
		if (actionId === VIEW_RESOURCE) navigate(routeService.users.details(successInfo?.resourceId ?? "--"));
		// Show user creation form
		else if (actionId === ADD_NEW) navigate(routeService.users.create);
		// Show users list
		else if (actionId === LIST_RESOURCES) navigate(routeService.users.list);
		else console.log("Success Action Not Found!");

		// Clear form
		setUserPayload(placeholderService.userForm);

		// Reset Mutaton State
		mutation.reset();
	};

	const getErrorMessage = (fieldName: string) => formService.getErrorMessage(fieldName, formErrors);

	const getApiError = () => (fetchingError || mutationError ? ((fetchingError || mutationError) as unknown as IError) : undefined);

	const { roleId, fullName, gender, phoneNumber } = userPayload;

	return (
		<>
			{/* Error Banner */}
			<ErrorBanner data={getApiError()} />

			{/* Success Banner */}
			<SuccessBanner data={successInfo} actionHandler={handleSuccessActions} entityName="User" actions={successActions} />

			<Card className="w-3/5 p-5">
				<form onSubmit={validateForm} className="grid grid-cols-2 gap-8">
					{/* Full Name */}
					<TextInput label="Full Name" onChange={onInputChange} getErrorMessage={getErrorMessage} value={fullName} className="col-span-2" />

					{/* Email */}
					<TextInput label="Email" onChange={onInputChange} getErrorMessage={getErrorMessage} value={userPayload.email} />

					{/* Phone Number */}
					<TextInput label="Phone Number" onChange={onInputChange} getErrorMessage={getErrorMessage} value={phoneNumber} />

					{/* Role */}
					<SelectInput label="Role" name="roleId" options={roleOptions} onChange={onSelectionChange} getErrorMessage={getErrorMessage} isLoading={isFetchingRoles} value={roleId} />

					{/* Gender */}
					<SelectInput label="Gender" options={genderOptions} onChange={onSelectionChange} getErrorMessage={getErrorMessage} value={gender} />

					{/* Submit Button */}
					<Button className="col-span-2 justify-center bg-primary-600" loading={isPending} type="submit" children={isPending ? "Saving..." : "Submit"} />
				</form>
			</Card>
		</>
	);
};
