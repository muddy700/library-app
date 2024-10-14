import { Button, CardFooter, Typography } from "@material-tailwind/react";
import { SelectInput } from "../form";
import { IPage, InputOption, PrimaryData } from "@lims/shared/types";

type FooterProps<T extends PrimaryData> = {
	isFetching: boolean;
	pageInfo: IPage<T>;
	onPagination: (fieldName: string, value: number) => void;
};

export const TableFooter = <T extends PrimaryData>({ isFetching, pageInfo, onPagination }: FooterProps<T>) => {
	const { totalItems, currentPage, totalPages, currentSize } = pageInfo;

	const isLastPage = () => currentPage + 1 === totalPages;

	const onSelectionChange = (fieldName: string, value?: string) => onPagination(fieldName, Number(value));

	const sizeOptions: InputOption[] = [
		{ label: "3", value: "3" },
		{ label: "5", value: "5" },
		{ label: "10", value: "10" },
		{ label: "15", value: "15" },
		{ label: "20", value: "20" },
	];

	const isSelectionDisabled = () => isFetching || currentSize >= totalItems;

	return (
		<CardFooter className="grid grid-cols-3 items-center border-t border-blue-gray-50 p-4 py-1">
			<Typography variant="small" color="blue-gray" className="font-semibold text-opacity-75">
				Page {currentPage + 1} of {totalPages} from {totalItems} {totalItems > 1 ? "rows" : "row"}
			</Typography>

			<div className="justify-self-center">
				<SelectInput disabled={isSelectionDisabled()} label={"Rows"} name="size" onChange={onSelectionChange} options={sizeOptions} size="md" value={currentSize.toString()} />
			</div>

			{isFetching ? (
				<Button size="sm" className="capitalize bg-primary-900 justify-self-end" loading={isFetching} children="Loading..." />
			) : (
				<div className="flex gap-3 items-center justify-self-end">
					<Button disabled={!currentPage} variant="outlined" size="sm" onClick={() => onPagination("page", currentPage - 1)}>
						Previous
					</Button>
					<Button disabled={isLastPage()} variant="outlined" size="sm" onClick={() => onPagination("page", currentPage + 1)}>
						Next
					</Button>
				</div>
			)}
		</CardFooter>
	);
};
