import React, { FormEvent, useState } from "react";
import { Task } from "../types";
import { IError, Success } from "@lims/shared/types";
import { UpdateTaskDto } from "../schemas";
import { DataDrawer } from "@lims/shared/components";
import { apiService, utilService } from "@lims/shared/services";
import { Button, Input } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";

type UpdateTaskFormProps = {
	toggleVisibility: (value: boolean) => void;
	handleSuccess: (response: Success) => void;
	handleFailure: (response: IError) => void;
	taskId: number;
};

export const UpdateTaskForm = ({ toggleVisibility, handleSuccess, taskId, handleFailure }: UpdateTaskFormProps) => {
	const { getById, put } = apiService;
	const { isLoading, data, error } = useQuery({ queryKey: ["todo", taskId], queryFn: () => getById<Task>("/tasks", taskId.toString()) });

	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const [taskPayload, setTaskPayload] = useState<UpdateTaskDto>();

	const title: string = "Task Form";
	const subTitle: string = "Edit the form below to update Task details.";

	if (data && !taskPayload) {
		const { title, maxDuration, published } = data;
		setTaskPayload({ title, maxDuration, published });
	}

	if (error) handleFailure(error as unknown as IError);

	const handleFormChanges = (e: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setTaskPayload({ ...taskPayload, [name]: value } as UpdateTaskDto);
	};

	const UpdateTaskInfo = async () => {
		if (!taskPayload) return;
		
		setIsUpdating(true);
		const response = await put<Success, UpdateTaskDto>("/tasks/" + taskId, { ...taskPayload, published: true });

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
