import { useBookInfo } from "@lims/shared/hooks";
import { Page } from "@lims/shared/layouts";
import { NavigationPath, IError, ITab } from "@lims/shared/types";
import { useParams } from "react-router-dom";
import { BookOpenIcon, InboxIcon } from "@heroicons/react/24/outline";
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import { BasicInfo, ReadPanel } from ".";

export const BookDetails = () => {
	const { bookId } = useParams();
	const { isLoading, data: bookInfo, error: fetchingError } = useBookInfo(bookId ?? "--");

	const navPaths: NavigationPath[] = [{ label: "books", url: "/books" }, { label: "book-details" }];

	const getApiError = () => (fetchingError ? (fetchingError as unknown as IError) : undefined);

	const tabsList: ITab[] = [
		{ label: "Basic Info", value: "book", icon: <InboxIcon className="w-5 h-5" strokeWidth={2} />, content: <BasicInfo book={bookInfo} /> },
		{ label: "Read Panel", value: "readPanel", icon: <BookOpenIcon className="w-5 h-5" strokeWidth={2} />, content: <ReadPanel book={bookInfo} /> },
	];

	return (
		<Page title="Book Details" subTitle="View details of a single book" paths={navPaths} errorInfo={getApiError()} isLoading={isLoading}>
			<Tabs value="book">
				<TabsHeader className="bg-primary-900">
					{tabsList.map(({ label, value, icon }) => (
						<Tab key={value} value={value}>
							<div className="flex items-center gap-2 font-bold">
								{icon}
								{label}
							</div>
						</Tab>
					))}
				</TabsHeader>
				<TabsBody animate={{ initial: { y: 250 }, mount: { y: 0 }, unmount: { y: 250 } }}>
					{tabsList.map(({ value, content }) => (
						<TabPanel key={value} value={value} className="text-primary-900/90 font-normal">
							{content}
						</TabPanel>
					))}
				</TabsBody>
			</Tabs>{" "}
		</Page>
	);
};
