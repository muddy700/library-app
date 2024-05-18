import React, { FormEvent, useEffect, useState } from "react";
import { Task } from "../types";
import { Success } from "../../../shared/types";
import { UpdateTaskDto } from "../payloads";
import { Loader } from "../../../shared/components";
import { apiService } from "../../../shared/services";

type UpdateTaskFormProps = {
	toggleUpdateTaskForm: (value: boolean) => void;
	handleSuccess: (response: Success) => void;
	taskId: number;
};

export const UpdateTaskForm = ({ toggleUpdateTaskForm, handleSuccess, taskId }: UpdateTaskFormProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const [taskPayload, setTaskPayload] = useState<UpdateTaskDto>({} as UpdateTaskDto);

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
			toggleUpdateTaskForm(false);
			handleSuccess(response);
		}
	};

	const handleFormSubmission = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		setIsUpdating(true);

		setTimeout(() => UpdateTaskInfo(), 1000);
	};

	const isFormValid = (): boolean => {
		return taskPayload !== undefined;
	};

	const getBgColor = (): string => {
		if (isFormValid()) return "bg-sky-300 hover:bg-sky-400";

		return "bg-white hover:cursor-not-allowed";
	};

	if (isLoading)
		return (
			<div className="absolute place-self-end bg-gray-200 z-50 w-2/5 h-full py-2">
				<Loader />
			</div>
		);

	return (
		<div className="absolute place-self-end bg-gray-200 z-50 w-2/5 h-full py-2">
			{/* Section Header */}
			<div className="grid grid-cols-5 text-start">
				{/* Close Button */}
				<button className="col-span-1 text-red-400 font-bold text-lg hover:text-red-500 hover:text-xl" onClick={() => toggleUpdateTaskForm(false)}>
					X
				</button>

				{/* Dialog Title */}
				<div className="col-span-4 ml-6 text-xl">Fill the form below to update Task info</div>
			</div>

			{/* Task Form: Start */}
			<form onSubmit={handleFormSubmission} className="grid gap-y-6 p-2 mt-10">
				{/* Title */}
				<div className="flex flex-col text-start">
					<label className="font-medium">Title: </label> <br />
					<input className="border border-indigo-300 rounded leading-9" type="text" name="title" onChange={handleFormChanges} value={taskPayload?.title} />
				</div>

				{/* Duration */}
				<div className="grid ">
					{/* Duration */}
					<div className="flex flex-col text-start">
						<label className="font-medium">Maximum Duration: </label> <br />
						<input type="number" className="border border-indigo-300 rounded leading-9" name="maxDuration" onChange={handleFormChanges} value={taskPayload?.maxDuration} />
					</div>
				</div>
				<button disabled={!isFormValid()} className={`${getBgColor()} py-1 rounded-md font-bold my-3`}>
					{isUpdating ? "Updating..." : "Update"}
				</button>
			</form>
			{/* Task Form: End */}
		</div>
	);
};
