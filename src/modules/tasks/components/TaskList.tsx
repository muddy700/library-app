import { useEffect, useState } from "react";
import { BaseTask } from "../types";
import { TaskDetails } from "./TaskDetails";
import { TaskForm } from "./TaskForm";
import { DataTable, Loader, SuccessBanner } from "@lims/shared/components";
import { UpdateTaskForm } from "./UpdateTaskForm";
import { Success, TableColumn } from "@lims/shared/types";
import { apiService } from "@lims/shared/services";
import { Button, Typography } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";

export const TaskList = () => {
	const [tasks, setTasks] = useState<BaseTask[]>([]);
	const [activeTaskId, setActiveTaskId] = useState<number>();
	const [showTaskDetails, setShowTaskDetails] = useState<boolean>(false);
	const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
	const [showUpdateTaskForm, setShowUpdateTaskForm] = useState<boolean>(false);
	const [successResponse, setSuccessResponse] = useState<Success | undefined>();
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const tableColumns: TableColumn[] = [
		{ label: "Title", fieldName: "title", dataType: "text" },
		{ label: "Created At", fieldName: "createdAt", dataType: "date" },
	];

	const fetchTasks = async () => {
		const response = await apiService.getWithQuery<BaseTask>("/tasks", { size: 10 });
		if (response) setTasks(response.items);
	};

	const viewTaskDetails = (taskId: number): void => {
		setActiveTaskId(taskId);
		setShowTaskDetails(true);
	};

	const handleSuccessActions = (actionId: number): void => {
		if (actionId === 1) {
			// View created Task
			viewTaskDetails(successResponse?.resourceId as unknown as number);
		} else if (actionId === 2) {
			// Add new Task
			setShowTaskForm(true);
		} else {
			// Show Todos List
			location.reload();
		}

		// Remove Success Banner
		setSuccessResponse(undefined);
	};

	const callHim = () => {
		fetchTasks();
	};

	useEffect(() => callHim(), []);

	const handleTaskDeletion = (taskId: number): void => {
		setIsDeleting(true);

		setTimeout(async () => {
			const response = await apiService.remove<Success>("/tasks/" + taskId);

			setIsDeleting(false);
			if (response) setSuccessResponse(response);
		}, 1000);
	};

	const handleTaskEdition = (taskId: number): void => {
		setShowTaskDetails(false);
		setShowUpdateTaskForm(true);
		setActiveTaskId(taskId);
	};

	const handleTaskRowEvents = (eventId: number, taskId: number): void => {
		if (eventId === 1) viewTaskDetails(taskId);
		else if (eventId === 2) handleTaskEdition(taskId);
		else if (eventId === 3) handleTaskDeletion(taskId);
	};

	if (successResponse)
		return (
			<div className="grid place-content-center">
				<SuccessBanner data={successResponse} actionHandler={handleSuccessActions} />
			</div>
		);

	return (
		<div className="grid place-content-center">
			{/* Task Details */}
			{showTaskDetails && activeTaskId && <TaskDetails taskId={activeTaskId} toggleTaskDetails={setShowTaskDetails} handleSuccess={setSuccessResponse} onEdit={handleTaskEdition} />}

			{/* Task Form */}
			{showTaskForm && <TaskForm toggleVisibility={setShowTaskForm} handleSuccess={setSuccessResponse} />}

			{/* Update Task Form */}
			{showUpdateTaskForm && activeTaskId && <UpdateTaskForm toggleUpdateTaskForm={setShowUpdateTaskForm} handleSuccess={setSuccessResponse} taskId={activeTaskId} />}

			{/* Page Title */}
			<Typography className="" variant="h4">
				Todos List({tasks.length})
			</Typography>

			{/* Create new task button */}
			{!isDeleting && (
				<Button className="flex justify-center items-center gap-3 bg-primary-600 hover:bg-primary-700 my-3" onClick={() => setShowTaskForm(true)}>
					<PlusIcon className="h-5 w-5 " />
					New Task
				</Button>
			)}

			{/* Todos list */}
			{!isDeleting && tasks && <DataTable<BaseTask> columns={tableColumns} data={tasks} eventHandler={handleTaskRowEvents} />}

			{/* Deletion Loader */}
			{isDeleting && (
				<div className="mt-6">
					<Loader />
				</div>
			)}
		</div>
	);
};
