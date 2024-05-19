import React, { FormEvent, useState } from "react";
import { Success } from "@lims/shared/types";
import { TaskDto } from "../payloads";
import { apiService } from "@lims/shared/services";

type TaskFormProps = {
	toggleTaskForm: (value: boolean) => void;
	handleSuccess: (response: Success) => void;
};

export const TaskForm = ({ toggleTaskForm, handleSuccess }: TaskFormProps) => {
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
			toggleTaskForm(false);
			handleSuccess(response);
		}
	};

	const handleFormSubmission = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		setIsLoading(true);

		setTimeout(() => saveTaskInfo(), 1000);
	};

	const isFormValid = (): boolean => {
		return taskPayload !== undefined;
	};

	const getBgColor = (): string => {
		if (isFormValid()) return "bg-sky-300 hover:bg-sky-400";

		return "bg-white hover:cursor-not-allowed";
	};

	return (
		<div className="absolute place-self-end bg-gray-200 z-50 w-2/5 h-full py-2">
			{/* Section Header */}
			<div className="grid grid-cols-5 text-start">
				{/* Close Button */}
				<button className="col-span-1 text-red-400 font-bold text-lg hover:text-red-500 hover:text-xl" onClick={() => toggleTaskForm(false)}>
					X
				</button>

				{/* Dialog Title */}
				<div className="col-span-4 ml-6 text-xl">Fill the form below to create new Task</div>
			</div>

			{/* Task Form: Start */}
			<form onSubmit={handleFormSubmission} className="grid gap-y-6 p-2 mt-10">
				{/* Title */}
				<div className="flex flex-col text-start">
					<label className="font-medium">Title: </label> <br />
					<input className="border border-indigo-300 rounded leading-9" type="text" name="title" onChange={handleFormChanges} />
				</div>

				{/* Author Name and Email */}
				<div className="grid grid-cols-2 gap-5">
					{/* Author Name */}
					<div className="flex flex-col text-start">
						<label className="font-medium">Autuhor Name: </label> <br />
						<input type="text" className="border border-indigo-300 rounded leading-9" name="authorName" onChange={handleFormChanges} />
					</div>
					{/* Author Name */}
					<div className="flex flex-col text-start">
						<label className="font-medium">Autuhor Email: </label> <br />
						<input type="text" className="border border-indigo-300 rounded leading-9" name="authorEmail" onChange={handleFormChanges} />
					</div>
				</div>

				{/* Duration */}
				<div className="grid ">
					{/* Duration */}
					<div className="flex flex-col text-start">
						<label className="font-medium">Maximum Duration: </label> <br />
						<input type="number" className="border border-indigo-300 rounded leading-9" name="maxDuration" onChange={handleFormChanges} />
					</div>
				</div>
				<button disabled={!isFormValid()} className={`${getBgColor()} py-1 rounded-md font-bold my-3`}>
					{isLoading ? "Loading..." : "Submit"}
				</button>
			</form>
			{/* Task Form: End */}
		</div>
	);
};
