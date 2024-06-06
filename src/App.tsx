import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "./shared/layouts";
import { AuthModule, DashboardModule, TasksModule, UsersModule } from "./modules";
import { PageNotFound } from "./shared/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

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

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default App;
