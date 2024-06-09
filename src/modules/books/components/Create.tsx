import { Page } from "@lims/shared/layouts";
import { NavigationPath } from "@lims/shared/types";
import { BookForm } from ".";

export const Create = () => {
	const navPaths: NavigationPath[] = [{ label: "books", url: "/books" }, { label: "create" }];

	return (
		<Page title="Create Book" subTitle="Create a new book" paths={navPaths} className="flex justify-center">
			<BookForm />
		</Page>
	);
};
