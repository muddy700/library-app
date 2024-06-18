import { HomeIcon } from "@heroicons/react/24/solid";
import { Breadcrumbs, Typography } from "@material-tailwind/react";
import { ReactNode } from "react";
import { IError, NavigationPath } from "../types";
import { ErrorBanner, Loader, PagePlaceholder } from "../components";
import { useNavigate } from "react-router-dom";
import { routeService } from "../services";

type PageProps = {
	title: string;
	subTitle: string;
	paths: NavigationPath[];
	children: ReactNode;
	className?: string;
	errorInfo?: IError;
	isLoading?: boolean;
};

export const Page = ({ title, subTitle, paths, children, className = "", errorInfo, isLoading = false }: PageProps) => {
	const navigate = useNavigate();

	return (
		<div className="w-full bg-secondary-200">
			{/* Page Header: Starts */}
			<div className="p-2 pb-1 flex justify-between items-center shadow-md shadow-primary-900/50">
				<div className="flex flex-col text-primary-900">
					<Typography variant="h4">{title}</Typography>
					<Typography variant="small" className="border-l-4 border-primary-900 ml-1 pl-1 font-normal">
						{subTitle}
					</Typography>
				</div>
				<Breadcrumbs>
					<Typography className="opacity-60 text-primary-900" onClick={() => navigate(routeService.dashboard.index)}>
						<HomeIcon className="h-4 w-4" />
					</Typography>
					{paths.length > 0 &&
						paths.map((item) => (
							<Typography key={item.label} onClick={() => navigate(item?.url ?? "#")} className="opacity-60 text-primary-900">
								<span>{item.label}</span>
							</Typography>
						))}
				</Breadcrumbs>
			</div>
			{/* Page Header: Ends */}

			{/* Page Body: Starts */}
			<div className={"p-2 pt-5 " + className}>
				{/* Error Banner */}
				<ErrorBanner data={errorInfo} />

				{/* Contents */}
				{isLoading ? <Loader className="mt-40" /> : children ?? <PagePlaceholder />}
			</div>
			{/* Page Body: Ends */}
		</div>
	);
};
