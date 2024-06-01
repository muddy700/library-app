import React, { FormEvent, useEffect, useState } from "react";
import { Task } from "../types";
import { Error, Success } from "@lims/shared/types";
import { UpdateTaskDto } from "../schemas";
import { DataDrawer } from "@lims/shared/components";
import { apiService, utilService } from "@lims/shared/services";
import { Button, Input } from "@material-tailwind/react";

type UpdateTaskFormProps = {
	toggleVisibility: (value: boolean) => void;
	handleSuccess: (response: Success) => void;
	handleFailure: (response: Error) => void;
	taskId: number;
};

export const UpdateTaskForm = ({ toggleVisibility, handleSuccess, taskId, handleFailure }: UpdateTaskFormProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const [taskPayload, setTaskPayload] = useState<UpdateTaskDto>({} as UpdateTaskDto);

	const title: string = "Task Form";
	const subTitle: string = "Edit the form below to update Task details.";

	useEffect(() => {
		(async () => {
			const response = await apiService.getById<Task>("/tasks/" + taskId);

			setIsLoading(false);

			if (utilService.isValidData(response)) {
				const { title, maxDuration, published } = response;
				setTaskPayload({ title, maxDuration, published });
			}
		})();
	}, [taskId]);

	const handleFormChanges = (e: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setTaskPayload({ ...taskPayload, [name]: value } as UpdateTaskDto);
	};

	const UpdateTaskInfo = async () => {
		setIsUpdating(true);
		const response = await apiService.put<Success, UpdateTaskDto>("/tasks/" + taskId, { ...taskPayload, published: true });

		setIsUpdating(false);

		if (utilService.isSuccess(response)) {
			toggleVisibility(false);
			handleSuccess(response);
		} else handleFailure(response);
	};

	const handleFormSubmission = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		UpdateTaskInfo();
	};

	return (
		<DataDrawer title={title} subTitle={subTitle} toggleVisibility={toggleVisibility} isLoading={isLoading}>
			<form onSubmit={handleFormSubmission} className="grid gap-8">
				{/* Title */}
				<Input label="Title" name="title" type="text" onChange={handleFormChanges} value={taskPayload?.title} color="teal" size="lg" required />

				{/* Duration */}
				<Input label="Maximum Duration" name="maxDuration" type="number" onChange={handleFormChanges} value={taskPayload?.maxDuration} color="teal" size="lg" required />

				{/* Action Button */}
				<Button className="justify-center bg-primary-600" loading={isUpdating} type="submit">
					{isUpdating ? "Updating..." : "Update"}
				</Button>
			</form>
		</DataDrawer>
	);
};
