import { Page } from "@lims/shared/layouts";
import { TaskList } from "./components";

export const TasksModule = () => {
	return <Page title="Tasks" subTitle="Manage your todos" path={["Public", "Todos"]} children={<TaskList />} />;
};
