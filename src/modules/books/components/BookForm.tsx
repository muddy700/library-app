import { IError, Success, Validation } from "@lims/shared/types";
import { useNavigate } from "react-router-dom";
import { BookDto, BookSchema } from "../schemas";
import { UseMutationResult } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { formService, placeholderService, routeService } from "@lims/shared/services";
import { SuccessActionEnum } from "@lims/shared/enums";
import { ZodError } from "zod";
import { ErrorBanner, SuccessBanner } from "@lims/shared/components";
import { Button, Card } from "@material-tailwind/react";
import { TextInput } from "@lims/shared/components/form";

type FormProps = {
	initialValues?: BookDto;
	mutation: UseMutationResult<Success, Error, BookDto>;
};

export const BookForm = ({ initialValues, mutation }: FormProps) => {
	const { mutate, isPending, data: successInfo, error: mutationError } = mutation;

	const [bookPayload, setBookPayload] = useState<BookDto>(initialValues ?? placeholderService.bookForm);
	const [formErrors, setFormErrors] = useState<Validation[]>([]);

	const navigate = useNavigate();
	const { ADD_NEW, VIEW_RESOURCE, LIST_RESOURCES } = SuccessActionEnum;
	const successActions = [ADD_NEW, VIEW_RESOURCE, LIST_RESOURCES];

	const onInputChange = ({ currentTarget: target }: FormEvent<HTMLInputElement>) => updatePayload(target.name, target.value);

	const updatePayload = (fieldName: string, value?: string) => {
		setBookPayload({ ...bookPayload, [fieldName]: value } as BookDto);
		formService.removeInputError(fieldName, formErrors, setFormErrors);
	};

	const validateForm = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		try {
			BookSchema.parse(bookPayload);
			mutate(bookPayload);
		} catch (error) {
			setFormErrors(formService.extractErrors(error as ZodError));
		}
	};

	const handleSuccessActions = (actionId: SuccessActionEnum) => {
		// View details of the created/updated book
		if (actionId === VIEW_RESOURCE) navigate(routeService.books.details(successInfo?.resourceId ?? "--"));
		// Show book creation form
		else if (actionId === ADD_NEW) navigate(routeService.books.create);
		// Show books list
		else if (actionId === LIST_RESOURCES) navigate(routeService.books.list);
		else console.log("Success Action Not Found!");

		// Clear form
		setBookPayload(placeholderService.bookForm);

		// Reset Mutaton State
		mutation.reset();
	};

	const getErrorMessage = (fieldName: string) => formService.getErrorMessage(fieldName, formErrors);

	const { title, description, content, coverImage, authorName } = bookPayload;

	return (
		<>
			{/* Error Banner */}
			<ErrorBanner data={mutationError as unknown as IError} />

			{/* Success Banner */}
			<SuccessBanner data={successInfo} actionHandler={handleSuccessActions} entityName="Book" actions={successActions} />

			<Card className="w-3/5 p-5">
				<form onSubmit={validateForm} className="grid grid-cols-2 gap-8">
					<TextInput label="Title" onChange={onInputChange} getErrorMessage={getErrorMessage} value={title} />
					<TextInput label="Author Name" onChange={onInputChange} getErrorMessage={getErrorMessage} value={authorName} />

					<TextInput label="Cover Image" onChange={onInputChange} getErrorMessage={getErrorMessage} value={coverImage} />
					<TextInput label="Content" onChange={onInputChange} getErrorMessage={getErrorMessage} value={content} />
					<TextInput label="Description" onChange={onInputChange} getErrorMessage={getErrorMessage} value={description} className="col-span-2" />

					{/* Submit Button */}
					<Button className="col-span-2 justify-center bg-primary-600" loading={isPending} type="submit" children={isPending ? "Saving..." : "Submit"} />
				</form>
			</Card>
		</>
	);
};
