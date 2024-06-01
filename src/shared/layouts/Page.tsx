import { HomeIcon } from "@heroicons/react/24/solid";
import { Breadcrumbs, Typography } from "@material-tailwind/react";
import { ReactNode } from "react";
import { Error, NavigationPath } from "../types";
import { ErrorBanner, Loader, PagePlaceholder } from "../components";
import { useNavigate } from "react-router-dom";

type PageProps = {
	title: string;
	subTitle: string;
	paths: NavigationPath[];
	children: ReactNode;
	className?: string;
	errorInfo?: Error;
	onCloseErrorDialog: (value?: Error) => void;
	isLoading?: boolean;
};

export const Page = ({ title, subTitle, paths, children, className, errorInfo, onCloseErrorDialog, isLoading = false }: PageProps) => {
	const navigate = useNavigate();
	const clearErrorInfo = () => onCloseErrorDialog(undefined);

	return (
		<div className="w-full bg-secondary-200 p-2">
			{/* Page Header: Starts */}
			<div className="flex justify-between">
				<div className="flex flex-col text-primary-900">
					<Typography variant="h4">{title}</Typography>
					<Typography variant="small" className="border-l-4 border-primary-900 ml-1 pl-1 font-normal">
						{subTitle}
					</Typography>
				</div>
				<Breadcrumbs>
					<Typography className="opacity-60 text-primary-900" onClick={() => navigate("/dashboard")}>
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
			<div className={"pt-10 " + className}>
				{/* Error Banner */}
				<ErrorBanner data={errorInfo} onClose={clearErrorInfo} />

				{/* Contents */}
				{isLoading ? <Loader /> : children ?? <PagePlaceholder />}
			</div>
			{/* Page Body: Ends */}
		</div>
	);
};
