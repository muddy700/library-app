import { useEffect, useState } from "react";
import { BaseTask } from "../types";
import { TaskDetails } from "./TaskDetails";
import { TaskForm } from "./TaskForm";
import { DataTable, ErrorBanner, Loader, SuccessBanner } from "@lims/shared/components";
import { UpdateTaskForm } from "./UpdateTaskForm";
import { Error, NavigationPath, Success, TableActionEnum, TableColumn } from "@lims/shared/types";
import { apiService, utilService } from "@lims/shared/services";
import { Page } from "@lims/shared/layouts";

export const TaskList = () => {
	const [tasks, setTasks] = useState<BaseTask[]>([]);
	const [activeTaskId, setActiveTaskId] = useState<number>();
	const [showTaskDetails, setShowTaskDetails] = useState<boolean>(false);
	const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
	const [showUpdateTaskForm, setShowUpdateTaskForm] = useState<boolean>(false);
	const [successResponse, setSuccessResponse] = useState<Success | undefined>();
	const [errorResponse, setErrorResponse] = useState<Error | undefined>();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const { NEW, FILTER, SEARCH, VIEW, UPDATE, DELETE } = TableActionEnum;
	const tableActions = [NEW, FILTER, SEARCH, VIEW, UPDATE, DELETE];

	const tableColumns: TableColumn[] = [
		{ label: "Title", fieldName: "title" },
		{ label: "Created At", fieldName: "createdAt", dataType: "date" },
	];

	const navPaths: NavigationPath[] = [{ label: "todos" }, { label: "list" }];

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

	useEffect(() => {
		(async () => {
			const response = await apiService.getWithQuery<BaseTask>("/tasks", { size: 8 });

			setIsLoading(false);
			if (utilService.isPage(response)) setTasks(response.items);
		})();
	}, []);

	const handleTaskDeletion = async (taskId: number) => {
		setIsLoading(true);
		const response = await apiService.remove<Success>("/tasks/" + taskId);

		setIsLoading(false);
		if (utilService.isSuccess(response)) setSuccessResponse(response);
	};

	const handleTaskEdition = (taskId: number): void => {
		setShowTaskDetails(false);
		setShowUpdateTaskForm(true);
		setActiveTaskId(taskId);
	};

	const handleTableActions = (actionId: TableActionEnum, data: unknown): void => {
		const taskId = data as number;

		if (actionId === VIEW) viewTaskDetails(taskId);
		else if (actionId === UPDATE) handleTaskEdition(taskId);
		else if (actionId === DELETE) handleTaskDeletion(taskId);
		else if (actionId === NEW) setShowTaskForm(true);
	};

	return (
		<Page title="Tasks" subTitle="Manage your todos" paths={navPaths}>
			{/* Success Banner */}
			<SuccessBanner data={successResponse} actionHandler={handleSuccessActions} />

			{/* Error Banner */}
			<ErrorBanner data={errorResponse} onClose={() => setErrorResponse(undefined)} />

			{/* Task Details */}
			{showTaskDetails && activeTaskId && <TaskDetails taskId={activeTaskId} toggleTaskDetails={setShowTaskDetails} handleSuccess={setSuccessResponse} onEdit={handleTaskEdition} />}

			{/* Task Form */}
			{showTaskForm && <TaskForm toggleVisibility={setShowTaskForm} handleSuccess={setSuccessResponse} />}

			{/* Update Task Form */}
			{showUpdateTaskForm && activeTaskId && (
				<UpdateTaskForm toggleVisibility={setShowUpdateTaskForm} handleSuccess={setSuccessResponse} taskId={activeTaskId} handleFailure={setErrorResponse} />
			)}

			{/* Todos list */}
			<DataTable<BaseTask> columns={tableColumns} data={tasks} actionHandler={handleTableActions} entityName="Task" actions={tableActions} isLoading={isLoading} />

			{/* Loader */}
			<Loader isLoading={isLoading} />
		</Page>
	);
};
