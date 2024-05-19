import { useEffect, useState } from "react";
import { Task } from "../types";
import { Loader } from "@lims/shared/components";
import { Success } from "@lims/shared/types";
import { apiService } from "@lims/shared/services";

type TaskDetailsProps = {
	taskId: number;
	toggleTaskDetails: (value: boolean) => void;
	handleSuccess: (response: Success) => void;
	onEdit: (taskId: number) => void;
};

export const TaskDetails = ({ taskId, toggleTaskDetails, handleSuccess, onEdit }: TaskDetailsProps) => {
	const [taskInfo, setTaskInfo] = useState<Task>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const fetchTaskInfo = async () => {
		const response = await apiService.getById<Task>("/tasks/" + taskId);

		setIsLoading(false);
		if (response) setTaskInfo(response);
	};

	const callHim = () => {
		setIsLoading(true);
		setTimeout(() => fetchTaskInfo(), 1000);
	};

	useEffect(() => callHim(), [taskId]);

	const closeDetailsDialog = () => {
		toggleTaskDetails(false);
	};

	const deleteTask = (): void => {
		setIsDeleting(true);

		setTimeout(async () => {
			const response = await apiService.remove<Success>("/tasks/" + taskId);

			setIsDeleting(false);

			if (response) {
				toggleTaskDetails(false);
				handleSuccess(response);
			}
		}, 1000);
	};

	const getStatus = (): string => {
		if (taskInfo?.published) return "Public";
		return "Private";
	};

	if (isLoading)
		return (
			<div className="absolute place-self-end bg-gray-200 z-50 w-2/5 h-full py-2">
				<Loader />
			</div>
		);

	return (
		<div className="absolute place-self-end bg-gray-200 z-50 w-2/5 h-full py-2">
			{/* Section Title */}
			<div className="grid grid-cols-5 text-start">
				{/* Close Button */}
				<button className="col-span-1 text-red-400 font-bold text-lg hover:text-red-500 hover:text-xl" onClick={closeDetailsDialog}>
					X
				</button>
				<div className="col-span-4 ml-6 text-xl">
					Details for Task with ID: <b>{taskId}</b>
				</div>
			</div>

			{/* Task Details */}
			{taskInfo && (
				<div>
					<div className="flex flex-col gap-y-6 mt-5 pl-5">
						{/* First Row */}
						<div className="text-start">
							<b>Title: </b>
							<span>{taskInfo.title}.</span>
						</div>

						{/* Second Row */}
						<div className="grid grid-cols-2 text-start">
							<div className="flex flex-col">
								<b>Author Name</b>
								<span>{taskInfo.authorName}</span>
							</div>
							<div className="flex flex-col">
								<b>Author Email</b>
								<span>{taskInfo.authorEmail}</span>
							</div>
						</div>

						{/* Third Row */}
						<div className="grid grid-cols-2 text-start">
							<div className="flex flex-col">
								<b>Maximum Duration</b>
								<span>{taskInfo.maxDuration}</span>
							</div>
							<div className="flex flex-col">
								<b>Status</b>
								<span>{getStatus()}</span>
							</div>
						</div>

						{/* Forth Row */}
						<div className="grid grid-cols-2 text-start">
							<div className="flex flex-col">
								<b>Created At</b>
								<span>{taskInfo?.createdAt.split("T")[0]}</span>
							</div>
							<div className="flex flex-col">
								<b>Updated At</b>
								<span>{taskInfo?.updatedAt.split("T")[0]}</span>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					{!isDeleting && (
						<div className="flex justify-center mt-12 gap-x-12">
							<button className="bg-sky-300 px-2 py-1 rounded-md hover:bg-sky-600" onClick={() => onEdit(taskId)}>
								Edit
							</button>
							<button className="bg-red-300 px-2 py-1 rounded-md hover:bg-red-600" onClick={() => deleteTask()}>
								Delete
							</button>
						</div>
					)}

					{/* Deletion Loader */}
					{isDeleting && (
						<div className="mt-6">
							<Loader />
						</div>
					)}
				</div>
			)}
		</div>
	);
};
