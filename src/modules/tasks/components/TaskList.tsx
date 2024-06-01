import { useEffect, useState } from "react";
import { BaseTask } from "../types";
import { TaskDetails } from "./TaskDetails";
import { TaskForm } from "./TaskForm";
import { DataTable, SuccessBanner } from "@lims/shared/components";
import { UpdateTaskForm } from "./UpdateTaskForm";
import { Error, NavigationPath, Success, TableColumn } from "@lims/shared/types";
import { apiService, utilService } from "@lims/shared/services";
import { Page } from "@lims/shared/layouts";
import { SuccessActionEnum, TableActionEnum } from "@lims/shared/enums";

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

	const { ADD_NEW, VIEW_RESOURCE, LIST_RESOURCES } = SuccessActionEnum;
	const successActions = [ADD_NEW, VIEW_RESOURCE, LIST_RESOURCES];

	const tableColumns: TableColumn[] = [
		{ label: "Title", fieldName: "title" },
		{ label: "Created At", fieldName: "createdAt", dataType: "date" },
	];

	const navPaths: NavigationPath[] = [{ label: "todos" }, { label: "list" }];

	const viewTaskDetails = (taskId: number): void => {
		setActiveTaskId(taskId);
		setShowTaskDetails(true);
	};

	const handleSuccessActions = (actionId: SuccessActionEnum): void => {
		if (actionId === VIEW_RESOURCE) {
			// View created Task
			viewTaskDetails(successResponse?.resourceId as unknown as number);
		} else if (actionId === ADD_NEW) {
			// Add new Task
			setShowTaskForm(true);
		} else if (actionId === LIST_RESOURCES) {
			// Show Todos List
			location.reload();
		} else console.log("Success Action Not Found!");

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
		<Page title="Tasks" subTitle="Manage your todos" paths={navPaths} errorInfo={errorResponse} onCloseErrorDialog={setErrorResponse}>
			{/* Success Banner */}
			<SuccessBanner data={successResponse} actionHandler={handleSuccessActions} entityName="Todo" actions={successActions} />

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
		</Page>
	);
};
