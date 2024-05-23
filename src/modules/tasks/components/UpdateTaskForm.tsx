import React, { FormEvent, useEffect, useState } from "react";
import { Task } from "../types";
import { Success } from "@lims/shared/types";
import { UpdateTaskDto } from "../schemas";
import { DataDrawer } from "@lims/shared/components";
import { apiService } from "@lims/shared/services";
import { Button, Input } from "@material-tailwind/react";

type UpdateTaskFormProps = {
	toggleVisibility: (value: boolean) => void;
	handleSuccess: (response: Success) => void;
	taskId: number;
};

export const UpdateTaskForm = ({ toggleVisibility, handleSuccess, taskId }: UpdateTaskFormProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const [taskPayload, setTaskPayload] = useState<UpdateTaskDto>({} as UpdateTaskDto);

	const title: string = "Task Form";
	const subTitle: string = "Edit the form below to update Task details.";

	const fetchTaskInfo = async () => {
		const response = await apiService.getById<Task>("/tasks/" + taskId);

		setIsLoading(false);

		if (response) {
			const { title, maxDuration, published } = response;
			setTaskPayload({ title, maxDuration, published });
		}
	};

	const callHim = () => {
		setIsLoading(true);
		setTimeout(() => fetchTaskInfo(), 1000);
	};

	useEffect(() => callHim(), [taskId]);

	const handleFormChanges = (e: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setTaskPayload({ ...taskPayload, [name]: value } as UpdateTaskDto);
	};

	const UpdateTaskInfo = async () => {
		const response = await apiService.patch<Success, UpdateTaskDto>("/tasks/" + taskId, { ...taskPayload, published: true });

		setIsUpdating(false);

		if (response) {
			toggleVisibility(false);
			handleSuccess(response);
		}
	};

	const handleFormSubmission = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		setIsUpdating(true);

		setTimeout(() => UpdateTaskInfo(), 1000);
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
