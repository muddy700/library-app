import React, { FormEvent, useState } from "react";
import { Success } from "@lims/shared/types";
import { TaskDto } from "../payloads";
import { apiService } from "@lims/shared/services";
import { DataDrawer } from "@lims/shared/components";
import { Button, Input } from "@material-tailwind/react";

type TaskFormProps = {
	toggleVisibility: (value: boolean) => void;
	handleSuccess: (response: Success) => void;
};

export const TaskForm = ({ toggleVisibility, handleSuccess }: TaskFormProps) => {
	const title: string = "Task Form";
	const subTitle: string = "Fill the form below to create new Task.";

	const [taskPayload, setTaskPayload] = useState<TaskDto>({} as TaskDto);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleFormChanges = (e: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setTaskPayload({ ...taskPayload, [name]: value } as TaskDto);
	};

	const saveTaskInfo = async () => {
		const response = await apiService.post<Success, TaskDto>("/tasks", taskPayload);

		setIsLoading(false);

		if (response) {
			toggleVisibility(false);
			handleSuccess(response);
		}
	};

	const handleFormSubmission = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		setIsLoading(true);

		setTimeout(() => saveTaskInfo(), 1000);
	};

	return (
		<DataDrawer title={title} subTitle={subTitle} toggleVisibility={toggleVisibility}>
			<form onSubmit={handleFormSubmission} className="grid gap-8">
				{/* Title */}
				<Input label="Title" name="title" type="text" onChange={handleFormChanges} color="teal" size="lg" required />

				{/* Author Name and Email */}
				<div className="flex gap-5">
					<Input label="Author Name" name="authorName" type="text" onChange={handleFormChanges} color="teal" size="lg" required />
					<Input label="Author Email" name="authorEmail" type="text" onChange={handleFormChanges} color="teal" size="lg" required />
				</div>

				{/* Duration */}
				<Input label="Maximum Duration" name="maxDuration" type="number" onChange={handleFormChanges} color="teal" size="lg" required />

				{/* Action Button */}
				<Button className="justify-center bg-primary-600" loading={isLoading} type="submit">
					{isLoading ? "Saving..." : "Submit"}
				</Button>
			</form>
		</DataDrawer>
	);
};
