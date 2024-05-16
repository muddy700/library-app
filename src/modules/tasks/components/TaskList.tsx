import { useEffect, useState } from "react";
import { BaseTask } from "../types";
import { TaskRow } from "./TaskRow";
import { TaskDetails } from "./TaskDetails";
import { TaskForm } from "./TaskForm";
import { Loader, SuccessBanner } from "../../../shared/components";
import { UpdateTaskForm } from "./UpdateTaskForm";
import * as apiService from "../../../shared/services/api.service";
import { Success } from "../../../shared/types";

export const TaskList = () => {
	const [tasks, setTasks] = useState<BaseTask[]>([]);
	const [activeTaskId, setActiveTaskId] = useState<number>();
	const [showTaskDetails, setShowTaskDetails] = useState<boolean>(false);
	const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
	const [showUpdateTaskForm, setShowUpdateTaskForm] = useState<boolean>(false);
	const [successResponse, setSuccessResponse] = useState<Success | undefined>();
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const [hoveredTask, setHoveredTask] = useState<number>(0);

	const fetchTasks = async () => {
		const response = await apiService.getWithQuery<BaseTask>("/tasks", { size: 3 });
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
		<div className="grid place-content-center relative">
			{/* Task Details */}
			{showTaskDetails && activeTaskId && <TaskDetails taskId={activeTaskId} toggleTaskDetails={setShowTaskDetails} handleSuccess={setSuccessResponse} onEdit={handleTaskEdition} />}

			{/* Task Form */}
			{showTaskForm && <TaskForm toggleTaskForm={setShowTaskForm} handleSuccess={setSuccessResponse} />}

			{/* Update Task Form */}
			{showUpdateTaskForm && activeTaskId && <UpdateTaskForm toggleUpdateTaskForm={setShowUpdateTaskForm} handleSuccess={setSuccessResponse} taskId={activeTaskId} />}

			{/* Page Title */}
			<div className="font-bold text-xl">Todos List({tasks.length})</div>

			{/* Create new task button */}
			{!isDeleting && (
				<button className="bg-blue-300 py-1 rounded-md font-bold hover:bg-blue-400 my-3" onClick={() => setShowTaskForm(true)}>
					New Task
				</button>
			)}

			{/* Todos list */}
			{!isDeleting && tasks.map((task: BaseTask) => <TaskRow key={task.id} taskInfo={task} eventHandler={handleTaskRowEvents} hoveredTask={hoveredTask} toggleHoveredTask={setHoveredTask} />)}

			{/* Deletion Loader */}
			{isDeleting && (
				<div className="mt-6">
					<Loader />
				</div>
			)}
		</div>
	);
};
