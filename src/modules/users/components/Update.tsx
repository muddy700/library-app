import { Page } from "@lims/shared/layouts";
import { IError, NavigationPath, Success, User } from "@lims/shared/types";
import { UserForm } from "./UserForm";
import { UserDto } from "../schemas";
import { apiService } from "@lims/shared/services";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

export const Update = () => {
	const { userId } = useParams();

	const mutation = useMutation({ mutationFn: (payload: UserDto) => apiService.put<Success, UserDto>("/users/" + userId, payload) });
	const { isLoading, data, error: fetchingError } = useQuery({ queryKey: ["user", userId], queryFn: () => apiService.getById<User>("/users", userId ?? "--") });

	const navPaths: NavigationPath[] = [{ label: "users", url: "/users" }, { label: "update" }];

	const getErrorInfo = () => (fetchingError ? (fetchingError as unknown as IError) : undefined);

	const getInitialValues = () => {
		if (!data) return data;

		const { fullName, email, phoneNumber, gender, role } = data;
		return { fullName, email, phoneNumber, roleId: role.id, gender };
	};

	return (
		<Page title="Update User" subTitle="Update user info" paths={navPaths} className="flex justify-center" errorInfo={getErrorInfo()} isLoading={isLoading}>
			<UserForm mutation={mutation} initialValues={getInitialValues()} />
		</Page>
	);
};
