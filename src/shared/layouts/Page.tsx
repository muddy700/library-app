import { HomeIcon } from "@heroicons/react/24/solid";
import { Breadcrumbs, Typography } from "@material-tailwind/react";
import { ReactNode } from "react";

type PageProps = {
	title: string;
	subTitle: string;
	path: string[];
	children: ReactNode;
};

export const Page = ({ title, subTitle, path, children }: PageProps) => {
	return (
		<div className="w-full bg-secondary-200">
			<div className="flex justify-between px-2">
				<div className="flex flex-col text-primary-900">
					<Typography variant="h4">{title}</Typography>
					<Typography variant="small" className="border-l-4 border-primary-900 ml-1 pl-1 font-normal">
						{subTitle}
					</Typography>
				</div>
				<Breadcrumbs>
					<a href="#" className="opacity-60">
						<HomeIcon className="h-5 w-5" />
					</a>
					{path.length > 0 &&
						path.map((item) => (
							<a key={item} href="#" className="opacity-60">
								<span>{item}</span>
							</a>
						))}
				</Breadcrumbs>
			</div>
			<div className="p-2 pt-4">{children}</div>
		</div>
	);
};
