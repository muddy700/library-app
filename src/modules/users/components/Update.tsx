import { Page } from "@lims/shared/layouts";
import { Error, NavigationPath, Success, User } from "@lims/shared/types";
import { useEffect, useState } from "react";
import { UserForm } from "./UserForm";
import { UserDto } from "../schemas";
import { apiService, utilService } from "@lims/shared/services";
import { useParams } from "react-router-dom";

export const Update = () => {
	const { userId } = useParams();
	const navPaths: NavigationPath[] = [{ label: "users", url: "/users" }, { label: "update" }];

	const [successInfo, setSuccessInfo] = useState<Success>();
	const [errorInfo, setErrorInfo] = useState<Error>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const [initialPayload, setInitialPayload] = useState<UserDto>();

	const updateUserInfo = async (payload: UserDto) => {
		setIsUpdating(true);

		const response = await apiService.put<Success, UserDto>("/users/" + userId, payload);
		setIsUpdating(false);

		if (utilService.isSuccess(response)) setSuccessInfo(response);
		else setErrorInfo(response);
	};

	const updateInitialPayload = (data: User) => {
		const { fullName, email, phoneNumber, gender, role } = data;
		setInitialPayload({ fullName, email, phoneNumber, roleId: role.id, gender });
	};

	useEffect(() => {
		(async () => {
			const response = await apiService.getById<User>("/users", userId ?? "--");
			setIsLoading(false);

			if (utilService.isValidData(response)) updateInitialPayload(response);
			else setErrorInfo(response);
		})();
	}, [userId]);

	return (
		<Page title="Update User" subTitle="Update user info" paths={navPaths} className="flex justify-center" errorInfo={errorInfo} onCloseErrorDialog={setErrorInfo} isLoading={isLoading}>
			{!isLoading && (
				<UserForm onSubmit={updateUserInfo} isLoading={isUpdating} setErrorInfo={setErrorInfo} setSuccessInfo={setSuccessInfo} initialValues={initialPayload} successInfo={successInfo} />
			)}
		</Page>
	);
};
