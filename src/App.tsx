import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "./shared/layouts";
import { AuthModule, DashboardModule, TasksModule, UsersModule } from "./modules";
import { PageNotFound } from "./shared/components";

const App = () => {
	const router = createBrowserRouter([
		{ path: "/auth/*", element: <AuthModule /> },
		{
			path: "/",
			element: <BaseLayout />,
			children: [
				{ index: true, element: <Navigate to={"dashboard"} /> },
				{ path: "dashboard/*", element: <DashboardModule /> },
				{ path: "todos/*", element: <TasksModule /> },
				{ path: "users/*", element: <UsersModule /> },
				{ path: "*", element: <PageNotFound /> },
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export default App;
