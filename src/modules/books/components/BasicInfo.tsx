import { PagePlaceholder, PropertyDiv, StatusChip, SuccessBanner } from "@lims/shared/components";
import { Book } from "../types";
import { apiService, routeService, utilService } from "@lims/shared/services";
import { Button } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Success } from "@lims/shared/types";
import React from "react";
import { SuccessActionEnum } from "@lims/shared/enums";
import { queryClient } from "@lims/shared/services/util.service";

type TProps = { book?: Book };
type TEnabled = { enabled: boolean };

export const BasicInfo = ({ book }: TProps) => {
	const navigate = useNavigate();
	const { ADD_NEW, VIEW_RESOURCE, LIST_RESOURCES } = SuccessActionEnum;
	const successActions = [ADD_NEW, VIEW_RESOURCE, LIST_RESOURCES];

	const { mutate, isPending, data: response, reset } = useMutation({ mutationFn: (payload: TEnabled) => apiService.put<Success, TEnabled>("/books/" + book?.id, payload) });

	const updateBook = () => mutate({ enabled: !book?.enabled });

	const isActive = () => book?.enabled ?? false;

	const handleSuccessActions = (actionId: SuccessActionEnum) => {
		// View details of the updated book
		if (actionId === VIEW_RESOURCE) navigate("#");
		// Show book creation form
		else if (actionId === ADD_NEW) navigate(routeService.books.create);
		// Show books list
		else if (actionId === LIST_RESOURCES) navigate(routeService.books.list);
		else console.log("Success Action Not Found!");

		// Reset the mutation to its initial state
		reset();
		queryClient.invalidateQueries({ queryKey: ["book", book?.id] });
	};

	if (!book) return <PagePlaceholder isOpen={true} />;

	return (
		<React.Fragment>
			{/* Success Banner */}
			<SuccessBanner data={response} actionHandler={handleSuccessActions} entityName="Book" actions={successActions} />

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

				<div className="flex gap-3">
					<Button variant="outlined" onClick={() => navigate(routeService.books.update(book.id))} className=" text-primary-600 border-primary-600">
						Update
					</Button>
					<Button loading={isPending} onClick={() => updateBook()} className={`${isActive() ? "bg-secondary-800" : "bg-primary-800"}`}>
						{isPending ? "Loading..." : isActive() ? "Disable" : "Activate"}
					</Button>
				</div>
			</div>
		</React.Fragment>
	);
};
