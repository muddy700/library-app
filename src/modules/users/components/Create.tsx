import { Page } from "@lims/shared/layouts";
import { UserForm } from ".";
import { useState } from "react";
import { UserDto } from "../schemas";
import { IError, NavigationPath, Success } from "@lims/shared/types";
import { apiService, utilService } from "@lims/shared/services";

export const Create = () => {
	const navPaths: NavigationPath[] = [{ label: "users", url: "/users" }, { label: "create" }];

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [successInfo, setSuccessInfo] = useState<Success>();
	const [errorInfo, setErrorInfo] = useState<IError>();

	const saveUserInfo = async (payload: UserDto) => {
		setIsLoading(true);

		const response = await apiService.post<Success, UserDto>("/users", payload);
		setIsLoading(false);

		if (utilService.isSuccess(response)) setSuccessInfo(response);
		else setErrorInfo(response);
	};

	return (
		<Page title="Create User" subTitle="Create a new user" paths={navPaths} className="flex justify-center" errorInfo={errorInfo} onCloseErrorDialog={setErrorInfo}>
			<UserForm onSubmit={saveUserInfo} isLoading={isLoading} setErrorInfo={setErrorInfo} setSuccessInfo={setSuccessInfo} successInfo={successInfo} />
		</Page>
	);
};
