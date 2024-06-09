import { TableActionEnum } from "@lims/shared/enums";
import { IError, NavigationPath, TableColumn } from "@lims/shared/types";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Book } from "../types";
import { apiService, routeService } from "@lims/shared/services";
import { DataTable } from "@lims/shared/components";
import { Page } from "@lims/shared/layouts";

export const BooksList = () => {
	const { isLoading, data, error } = useQuery({ queryKey: ["books"], queryFn: () => apiService.getWithQuery<Book>("/books", { size: 9 }) });

	const navigate = useNavigate();
	const { NEW, FILTER, SEARCH, VIEW, UPDATE } = TableActionEnum;
	const tableActions = [NEW, FILTER, SEARCH, VIEW, UPDATE];

	const navPaths: NavigationPath[] = [{ label: "books" }, { label: "list" }];

	const tableColumns: TableColumn[] = [
		{ label: "Registration Number", fieldName: "registrationNumber" },
		{ label: "Title", fieldName: "title" },
		{ label: "Author", fieldName: "authorName" },
		{ label: "Reviews", fieldName: "reviewsCount" },
		{ label: "Ratings", fieldName: "ratings" },
		{ label: "Status", fieldName: "enabled", dataType: "boolean", options: { valid: "Public", invalid: "Private" } },
	];

	const getErrorInfo = () => (error ? (error as unknown as IError) : undefined);

	const handleTableActions = (actionId: TableActionEnum, data: unknown): void => {
		const bookId = data as string;

		if (actionId === VIEW) navigate(routeService.books.details(bookId));
		else if (actionId === NEW) navigate(routeService.books.create);
		else if (actionId === UPDATE) navigate(routeService.books.update(bookId));
	};

	return (
		<Page title="Books" subTitle="Manage library books" paths={navPaths} errorInfo={getErrorInfo()}>
			<DataTable<Book> columns={tableColumns} dataPage={data} entityName="Book" actions={tableActions} actionHandler={handleTableActions} isLoading={isLoading} />
		</Page>
	);
};
