import { HomeIcon } from "@heroicons/react/24/solid";
import { Breadcrumbs, Typography } from "@material-tailwind/react";
import { ReactNode } from "react";
import { NavigationPath } from "../types";

type PageProps = {
	title: string;
	subTitle: string;
	paths: NavigationPath[];
	children: ReactNode;
	className?: string;
};

export const Page = ({ title, subTitle, paths, children, className }: PageProps) => {
	return (
		<div className="w-full bg-secondary-200 p-2">
			<div className="flex justify-between">
				<div className="flex flex-col text-primary-900">
					<Typography variant="h4">{title}</Typography>
					<Typography variant="small" className="border-l-4 border-primary-900 ml-1 pl-1 font-normal">
						{subTitle}
					</Typography>
				</div>
				<Breadcrumbs>
					<a href="/dashboard" className="opacity-60 text-primary-900">
						<HomeIcon className="h-4 w-4" />
					</a>
					{paths.length > 0 &&
						paths.map((item) => (
							<a key={item.label} href={`${item?.url ?? "#"}`} className="opacity-60 text-primary-900">
								<span>{item.label}</span>
							</a>
						))}
				</Breadcrumbs>
			</div>
			<div className={"pt-10 " + className}>{children}</div>
		</div>
	);
};
