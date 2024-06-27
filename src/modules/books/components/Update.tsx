import { useParams } from "react-router-dom";
import { BookForm } from ".";
import { IError, NavigationPath, Success } from "@lims/shared/types";
import { Page } from "@lims/shared/layouts";
import { useBookInfo } from "@lims/shared/hooks";
import { useMutation } from "@tanstack/react-query";
import { BookDto } from "../schemas";
import { apiService, routeService } from "@lims/shared/services";

export const Update = () => {
	const { bookId } = useParams();

	const mutation = useMutation({ mutationFn: (payload: BookDto) => apiService.put<Success, BookDto>("/books/" + bookId, payload) });
	const { isLoading, data, error: fetchingError } = useBookInfo(bookId ?? "--");

	const navPaths: NavigationPath[] = [{ label: "books", url: routeService.books.list }, { label: "update" }];

	const getApiError = () => fetchingError && (fetchingError as unknown as IError);

	const getInitialValues = () => {
		if (!data) return data;

		const { title, description, content, coverImage, authorName } = data;
		return { title, description, content, coverImage, authorName };
	};

	return (
		<Page title="Update Book" subTitle="Update book info" paths={navPaths} className="flex justify-center" errorInfo={getApiError()} isLoading={isLoading}>
			<BookForm mutation={mutation} initialValues={getInitialValues()} />
		</Page>
	);
};
