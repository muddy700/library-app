import { useState } from "react";
import { Task } from "../types";
import { DataDrawer } from "@lims/shared/components";
import { Success } from "@lims/shared/types";
import { apiService, utilService } from "@lims/shared/services";
import { Button } from "@material-tailwind/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";

type TaskDetailsProps = {
	taskId: number;
	toggleTaskDetails: (value: boolean) => void;
	handleSuccess: (response: Success) => void;
	onEdit: (taskId: number) => void;
};

export const TaskDetails = ({ taskId, toggleTaskDetails, handleSuccess, onEdit }: TaskDetailsProps) => {
	const { getById, remove } = apiService;
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const { isLoading, data: taskInfo } = useQuery({ queryKey: ["todo", taskId], queryFn: () => getById<Task>("/tasks", taskId.toString()) });

	const title: string = "Task Details";
	const subTitle: string = `Details for Task with ID: ${taskId}`;

	const deleteTask = async () => {
		setIsDeleting(true);
		const response = await remove<Success>("/tasks/" + taskId);

		setIsDeleting(false);

		if (utilService.isSuccess(response)) {
			toggleTaskDetails(false);
			handleSuccess(response);
		}
	};

	const getStatus = (): string => {
		if (taskInfo?.published) return "Public";
		return "Private";
	};

	return (
		<DataDrawer title={title} subTitle={subTitle} toggleVisibility={toggleTaskDetails} isLoading={isDeleting || isLoading}>
			{/* Task Details */}
			{taskInfo && (
				<div className="flex flex-col gap-y-6">
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

					{/* Action Buttons */}
					<div className="flex justify-around mt-12">
						<Button className="flex items-center gap-3 bg-secondary-700/75" onClick={() => onEdit(taskId)}>
							<PencilSquareIcon className="h-5 w-5" />
							Edit
						</Button>
						<Button className="flex items-center gap-3 bg-red-500" onClick={() => deleteTask()}>
							<TrashIcon className="h-5 w-5" />
							Delete
						</Button>
					</div>
				</div>
			)}
		</DataDrawer>
	);
};
