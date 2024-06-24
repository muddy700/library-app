import { TableActionEnum } from "@lims/shared/enums";
import { IError, IPage, NavigationPath, QueryParams, TableColumn } from "@lims/shared/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Book } from "../types";
import { apiService, placeholderService, routeService } from "@lims/shared/services";
import { DataTable } from "@lims/shared/components";
import { Page } from "@lims/shared/layouts";
import { useState } from "react";

export const BooksList = () => {
	const [params, setParams] = useState<QueryParams>(placeholderService.defaultQueryParams);

	const queryFn = () => apiService.getWithQuery<Book>("/books", params);
	const booksQuery = useQuery<IPage<Book>, IError>({ queryKey: ["books", params], queryFn, placeholderData: keepPreviousData });

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

	const tableActionsHandler = (actionId: TableActionEnum, data: unknown): void => {
		const bookId = data as string;

		if (actionId === VIEW) navigate(routeService.books.details(bookId));
		else if (actionId === NEW) navigate(routeService.books.create);
		else if (actionId === UPDATE) navigate(routeService.books.update(bookId));
	};

	const paginationHandler = (fieldName: string, value: number) => setParams({ ...params, [fieldName]: value });

	return (
		<Page title="Books" subTitle="Manage library books" paths={navPaths} errorInfo={booksQuery.error}>
			<DataTable<Book> columns={tableColumns} pageQuery={booksQuery} entityName="Book" actions={tableActions} actionHandler={tableActionsHandler} onPagination={paginationHandler} />
		</Page>
	);
};
