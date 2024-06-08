import { Page } from "@lims/shared/layouts";
import { UserForm } from ".";
import { UserDto } from "../schemas";
import { NavigationPath, Success } from "@lims/shared/types";
import { apiService } from "@lims/shared/services";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@lims/shared/services/util.service";

export const Create = () => {
	const navPaths: NavigationPath[] = [{ label: "users", url: "/users" }, { label: "create" }];

	const mutation = useMutation({
		mutationFn: (payload: UserDto) => apiService.post<Success, UserDto>("/users", payload),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
	});

	return (
		<Page title="Create User" subTitle="Create a new user" paths={navPaths} className="flex justify-center">
			<UserForm mutation={mutation} />
		</Page>
	);
};
