import { SuccessBanner } from "@lims/shared/components";
import { Page } from "@lims/shared/layouts";
import { formService, apiService, utilService, placeholderService } from "@lims/shared/services";
import { Error, InputOption, NavigationPath, Role, Success, Validation } from "@lims/shared/types";
import { Button } from "@material-tailwind/react";
import { useState, FormEvent, useEffect } from "react";
import { ZodError } from "zod";
import { UserDto, UserSchema } from "../schemas";
import { SelectInput, TextInput } from "@lims/shared/components/form";
import { useNavigate } from "react-router-dom";
import { SuccessActionEnum } from "@lims/shared/enums";

export const UserForm = () => {
	const navPaths: NavigationPath[] = [{ label: "users", url: "/users" }, { label: "create" }];

	const [roleOptions, setRoleOptions] = useState<InputOption[]>([]);
	const [isFetchingRoles, setIsFetchingRoles] = useState<boolean>(true);
	const [userPayload, setUserPayload] = useState<UserDto>(placeholderService.userForm);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [formErrors, setFormErrors] = useState<Validation[]>([]);
	const [successInfo, setSuccessInfo] = useState<Success>();
	const [errorInfo, setErrorInfo] = useState<Error>();

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

	const saveUserInfo = async () => {
		setIsLoading(true);
		const payload = { ...userPayload, phoneNumber: "255" + userPayload.phoneNumber };

		const response = await apiService.post<Success, UserDto>("/users", payload);
		setIsLoading(false);

		if (utilService.isSuccess(response)) setSuccessInfo(response);
		else setErrorInfo(response);
	};

	const validateForm = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		try {
			UserSchema.parse(userPayload);
			saveUserInfo();
		} catch (error) {
			setFormErrors(formService.extractErrors(error as ZodError));
		}
	};

	const handleSuccessActions = (actionId: SuccessActionEnum) => {
		// View details of the created user
		if (actionId === VIEW_RESOURCE) navigate("../" + successInfo?.resourceId + "/details");
		// Clear form
		else if (actionId === ADD_NEW) setUserPayload(placeholderService.userForm);
		// Show users list
		else if (actionId === LIST_RESOURCES) navigate("../");
		else console.log("Success Action Not Found!");

		// Remove Success Banner
		setSuccessInfo(undefined);
	};

	const getErrorMessage = (fieldName: string) => formService.getErrorMessage(fieldName, formErrors);

	useEffect(() => {
		(async () => {
			const response = await apiService.getWithQuery<Role>("/roles", { size: 100 });

			setIsFetchingRoles(false);
			if (utilService.isPage(response)) {
				setRoleOptions(response.items.filter(({ active }) => active).map(({ id, name }) => ({ label: name, value: id } as InputOption)));
			} else setErrorInfo(response);
		})();
	}, []);

	const { roleId, fullName, gender, phoneNumber } = userPayload;

	return (
		<Page title="User Form" subTitle="Create a new user" paths={navPaths} className="flex justify-center" errorInfo={errorInfo} onCloseErrorDialog={setErrorInfo}>
			{/* Success Banner */}
			<SuccessBanner data={successInfo} actionHandler={handleSuccessActions} entityName="User" actions={successActions} />

			<form onSubmit={validateForm} className="grid grid-cols-2 gap-8 w-3/5">
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
		</Page>
	);
};
