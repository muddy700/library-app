import { PagePlaceholder, PropertyDiv, StatusChip } from "@lims/shared/components";
import { Book } from "../types";
import { utilService } from "@lims/shared/services";

type TProps = { book?: Book };

export const BasicInfo = ({ book }: TProps) => {
	if (!book) return <PagePlaceholder isOpen={true} />;

	return (
		<div className="flex flex-col gap-5 text-primary-900/90">
			<div className="flex justify-between">
				<PropertyDiv label={"Registration Number"} value={book?.registrationNumber} />
				<PropertyDiv label={"Title"} value={book?.title} />
				<PropertyDiv label={"Author"} value={book?.authorName} />
				<PropertyDiv label={"Status"} value={<StatusChip value={book?.enabled ? "Public" : "Private"} theme={book?.enabled} />} />
				<PropertyDiv label={"Ratings"} value={book?.ratings} />
			</div>
			<PropertyDiv label={"Description"} value={book?.description} />
			<div>
				<div>
					<span className="font-semibold">Reviews</span> ({book?.reviews?.length})
				</div>
				{book?.reviews?.map((review) => (
					<div className="flex gap-3 ml-5">
						<div>{review.user.fullName}:</div>
						<div className="italic ">{review.comment}</div>
						<div>{utilService.formatDate(review.updatedAt)}</div>
					</div>
				))}
			</div>
		</div>
	);
};
