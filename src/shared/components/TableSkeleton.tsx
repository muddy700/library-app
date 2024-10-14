import { Typography } from "@material-tailwind/react";

export const TableSkeleton = () => {
	const backgroundColor: string = "bg-primary-800/50 ";

	return (
		<div className="flex flex-col gap-2 animate-pulse">
			{/* Table actions row: Start */}
			<div className="flex items-center justify-between">
				<div className="flex gap-3 items-center">
					<Typography as="div" variant="paragraph" className={backgroundColor + "w-32 h-9 rounded"}>
						&nbsp;
					</Typography>
					<Typography as="div" variant="paragraph" className={backgroundColor + "w-28 h-9 rounded"}>
						&nbsp;
					</Typography>
				</div>
				<div className="w-72">
					<Typography as="div" variant="paragraph" className={backgroundColor + "h-9 w-full rounded"}>
						&nbsp;
					</Typography>
				</div>
			</div>
			{/* Table actions row: End */}

			<div className="h-full w-full">
				{/* Table header */}
				<Typography as="div" variant="paragraph" className={backgroundColor + "mb-2 h-8 w-full rounded"}>
					&nbsp;
				</Typography>

				{/* Table rows */}
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => (
					<Typography key={item} as="div" variant="paragraph" className={backgroundColor + "mb-2 h-3 w-full rounded"}>
						&nbsp;
					</Typography>
				))}
			</div>
		</div>
	);
};
