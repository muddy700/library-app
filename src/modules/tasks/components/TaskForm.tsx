import React, { FormEvent, useState } from "react";
import { Success, Validation } from "@lims/shared/types";
import { TaskDto, TaskSchema } from "../schemas";
import { apiService, formService, utilService } from "@lims/shared/services";
import { DataDrawer, InputError } from "@lims/shared/components";
import { Button, Input } from "@material-tailwind/react";
import { ZodError } from "zod";

type TaskFormProps = {
	toggleVisibility: (value: boolean) => void;
	handleSuccess: (response: Success) => void;
};

export const TaskForm = ({ toggleVisibility, handleSuccess }: TaskFormProps) => {
	const title: string = "Task Form";
	const subTitle: string = "Fill the form below to create new Task.";

	const [taskPayload, setTaskPayload] = useState<TaskDto>({} as TaskDto);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [formErrors, setFormErrors] = useState<Validation[]>([]);

	const handleFormChanges = (e: React.FormEvent<HTMLInputElement>) => {
		const { name: fieldName, value } = e.currentTarget;

		formService.removeInputError(fieldName, formErrors, setFormErrors);
		setTaskPayload({ ...taskPayload, [fieldName]: value } as TaskDto);
	};

	const saveTaskInfo = async () => {
		const response = await apiService.post<Success, TaskDto>("/tasks", taskPayload);

		setIsLoading(false);

		if (utilService.isSuccess(response)) {
			toggleVisibility(false);
			handleSuccess(response);
		}
	};

	const handleFormSubmission = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		try {
			TaskSchema.parse({ ...taskPayload, maxDuration: Number(taskPayload.maxDuration) });

			setIsLoading(true);
			setTimeout(() => saveTaskInfo(), 1000);
		} catch (error) {
			setFormErrors(formService.extractErrors(error as ZodError));
		}
	};

	return (
		<DataDrawer title={title} subTitle={subTitle} toggleVisibility={toggleVisibility}>
			<form onSubmit={handleFormSubmission} className="grid gap-8">
				{/* Title */}
				<div>
					<Input label="Title" name="title" type="text" onChange={handleFormChanges} color="teal" size="lg" error={formService.hasError("title", formErrors)} required />
					<InputError show={formService.hasError("title", formErrors)} message={formService.getErrorMessage("title", formErrors)} />
				</div>

				{/* Author Name and Email */}
				<div className="flex gap-5">
					<div>
						<Input label="Author Name" name="authorName" type="text" onChange={handleFormChanges} color="teal" size="lg" error={formService.hasError("authorName", formErrors)} />
						<InputError show={formService.hasError("authorName", formErrors)} message={formService.getErrorMessage("authorName", formErrors)} />
					</div>
					<div>
						<Input label="Author Email" name="authorEmail" type="text" onChange={handleFormChanges} color="teal" size="lg" error={formService.hasError("authorEmail", formErrors)} />
						<InputError show={formService.hasError("authorEmail", formErrors)} message={formService.getErrorMessage("authorEmail", formErrors)} />
					</div>
				</div>

				{/* Duration */}
				<div>
					<Input
						label="Maximum Duration"
						name="maxDuration"
						type="number"
						onChange={handleFormChanges}
						color="teal"
						size="lg"
						error={formService.hasError("maxDuration", formErrors)}
						required
					/>
					<InputError show={formService.hasError("maxDuration", formErrors)} message={formService.getErrorMessage("maxDuration", formErrors)} />
				</div>

				{/* Action Button */}
				<Button className="justify-center bg-primary-600" loading={isLoading} type="submit">
					{isLoading ? "Saving..." : "Submit"}
				</Button>
			</form>
		</DataDrawer>
	);
};
