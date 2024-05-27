import { Route, Routes } from "react-router-dom";
import { TaskList } from "./components";

export const TasksModule = () => {
	return (
		<Routes>
			<Route index element={<TaskList />} />
		</Routes>
	);
};
