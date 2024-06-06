import { SuccessBanner } from "@lims/shared/components";
import { formService, apiService, utilService, placeholderService } from "@lims/shared/services";
import { IError, InputOption, Role, Success, Validation } from "@lims/shared/types";
import { Button, Card } from "@material-tailwind/react";
import { useState, FormEvent } from "react";
import { ZodError } from "zod";
import { UserDto, UserSchema } from "../schemas";
import { SelectInput, TextInput } from "@lims/shared/components/form";
import { useNavigate } from "react-router-dom";
import { SuccessActionEnum } from "@lims/shared/enums";
import { useQuery } from "@tanstack/react-query";

type FormProps = {
	onSubmit: (payload: UserDto) => void;
	isLoading?: boolean;
	successInfo?: Success;
	setSuccessInfo: (successInfo?: Success) => void;
	setErrorInfo: (errorInfo?: IError) => void;
	initialValues?: UserDto;
};

export const UserForm = ({ onSubmit, isLoading = false, setErrorInfo, successInfo, setSuccessInfo, initialValues }: FormProps) => {
	const { isLoading: isFetchingRoles, data: rolesPage, error } = useQuery({ queryKey: ["roles"], queryFn: () => apiService.getAll<Role>("/roles") });

	const [roleOptions, setRoleOptions] = useState<InputOption[]>([]);
	const [userPayload, setUserPayload] = useState<UserDto>(initialValues ?? placeholderService.userForm);
	const [formErrors, setFormErrors] = useState<Validation[]>([]);

	const genderOptions: InputOption[] = [
		{ label: "Male", value: "M" },
		{ label: "Female", value: "F" },
	];

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
			onSubmit(userPayload);
		} catch (error) {
			setFormErrors(formService.extractErrors(error as ZodError));
		}
	};

	const handleSuccessActions = (actionId: SuccessActionEnum) => {
		// View details of the created/updated user
		if (actionId === VIEW_RESOURCE) navigate(utilService.routes.usersList + "/" + successInfo?.resourceId + "/details");
		else if (actionId === ADD_NEW) navigate(utilService.routes.createUser);
		// Show users list
		else if (actionId === LIST_RESOURCES) navigate(utilService.routes.usersList);
		else console.log("Success Action Not Found!");

		// Remove Success Banner
		setSuccessInfo(undefined);
	};

	if (error) setErrorInfo(error as unknown as IError);

	const getErrorMessage = (fieldName: string) => formService.getErrorMessage(fieldName, formErrors);

	if (rolesPage && !roleOptions.length) setRoleOptions(rolesPage.items.filter(({ active }) => active).map(({ id, name }) => ({ label: name, value: id } as InputOption)));

	const { roleId, fullName, gender, phoneNumber } = userPayload;

	return (
		<>
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
					<Button className="col-span-2 justify-center bg-primary-600" loading={isLoading} type="submit" children={isLoading ? "Saving..." : "Submit"} />
				</form>
			</Card>
		</>
	);
};
