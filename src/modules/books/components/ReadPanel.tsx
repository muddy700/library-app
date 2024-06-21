import { PagePlaceholder } from "@lims/shared/components";
import { Book } from "../types";

type TProps = { book?: Book };

export const ReadPanel = ({ book }: TProps) => {
	if (!book) return <PagePlaceholder isOpen={true} />;

	return (
		<div className="h-[70vh]">
			<iframe src={book.content} width="100%" height="100%" className="rounded" />
		</div>
	);
};
