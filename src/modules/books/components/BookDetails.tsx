import { useBookInfo } from "@lims/shared/hooks";
import { Page } from "@lims/shared/layouts";
import { NavigationPath, IError } from "@lims/shared/types";
import { useParams } from "react-router-dom";

export const BookDetails = () => {
	const { bookId } = useParams();
	const { isLoading, data, error: fetchingError } = useBookInfo(bookId ?? "--");

	const navPaths: NavigationPath[] = [{ label: "books", url: "/books" }, { label: "book-details" }];

	const getErrorInfo = () => (fetchingError ? (fetchingError as unknown as IError) : undefined);

	return (
		<Page title="Book Details" subTitle="View details of a single book" paths={navPaths} className="flex justify-center" errorInfo={getErrorInfo()} isLoading={isLoading}>
			<div>Title: {data?.title}</div>
		</Page>
	);
};
