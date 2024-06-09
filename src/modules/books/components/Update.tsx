import { useParams } from "react-router-dom";
import { BookForm } from ".";
import { IError, NavigationPath } from "@lims/shared/types";
import { Page } from "@lims/shared/layouts";
import { useBookInfo } from "@lims/shared/hooks";

export const Update = () => {
	const { bookId } = useParams();
	const { isLoading, data, error: fetchingError } = useBookInfo(bookId ?? "--");

	const navPaths: NavigationPath[] = [{ label: "books", url: "/books" }, { label: "update" }];

	const getErrorInfo = () => (fetchingError ? (fetchingError as unknown as IError) : undefined);

	return (
		<Page title="Update Book" subTitle="Update book info" paths={navPaths} className="flex flex-col items-center justify-center gap-5" errorInfo={getErrorInfo()} isLoading={isLoading}>
			<div>Title: {data?.title}</div>
			<BookForm />
		</Page>
	);
};
