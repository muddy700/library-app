import { Page } from "@lims/shared/layouts";
import { IError, NavigationPath, Success, User } from "@lims/shared/types";
import { useState } from "react";
import { UserForm } from "./UserForm";
import { UserDto } from "../schemas";
import { apiService, utilService } from "@lims/shared/services";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const Update = () => {
	const { userId } = useParams();
	const { isLoading, data, error } = useQuery({ queryKey: ["user", userId], queryFn: () => apiService.getById<User>("/users", userId ?? "--") });

	const navPaths: NavigationPath[] = [{ label: "users", url: "/users" }, { label: "update" }];

	const [successInfo, setSuccessInfo] = useState<Success>();
	const [errorInfo, setErrorInfo] = useState<IError>();
	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const [initialPayload, setInitialPayload] = useState<UserDto>();

	const updateUserInfo = async (payload: UserDto) => {
		setIsUpdating(true);

		const response = await apiService.put<Success, UserDto>("/users/" + userId, payload);
		setIsUpdating(false);

		if (utilService.isSuccess(response)) setSuccessInfo(response);
		else setErrorInfo(response);
	};

	const getErrorInfo = () => (error ? (error as unknown as IError) : errorInfo);

	if (data && !initialPayload) {
		const { fullName, email, phoneNumber, gender, role } = data;
		setInitialPayload({ fullName, email, phoneNumber, roleId: role.id, gender });
	}

	return (
		<Page title="Update User" subTitle="Update user info" paths={navPaths} className="flex justify-center" errorInfo={getErrorInfo()} isLoading={isLoading}>
			{!isLoading && (
				<UserForm onSubmit={updateUserInfo} isLoading={isUpdating} setErrorInfo={setErrorInfo} setSuccessInfo={setSuccessInfo} initialValues={initialPayload} successInfo={successInfo} />
			)}
		</Page>
	);
};
