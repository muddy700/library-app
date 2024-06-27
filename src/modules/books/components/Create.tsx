import { Page } from "@lims/shared/layouts";
import { NavigationPath, Success } from "@lims/shared/types";
import { BookForm } from ".";
import { useMutation } from "@tanstack/react-query";
import { BookDto } from "../schemas";
import { apiService, routeService } from "@lims/shared/services";
import { queryClient } from "@lims/shared/services/util.service";

export const Create = () => {
	const navPaths: NavigationPath[] = [{ label: "books", url: routeService.books.list }, { label: "create" }];

	const mutation = useMutation({
		mutationFn: (payload: BookDto) => apiService.post<Success, BookDto>("/books", payload),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }),
	});

	return (
		<Page title="Create Book" subTitle="Create a new book" paths={navPaths} className="flex justify-center">
			<BookForm mutation={mutation} />
		</Page>
	);
};
