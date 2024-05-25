import { Typography } from "@material-tailwind/react";
import { TableColumn } from "../types";

type TableHeadProps = {
	hasSerialNumbers: boolean;
	hasActionsColumn: boolean;
	columns: TableColumn[];
};

export const TableHead = ({ hasSerialNumbers, hasActionsColumn, columns }: TableHeadProps) => {
	// Re-used classes
	const thClasses = "border-b border-blue-gray-100 bg-primary-900 p-4";
	const thTypographyClasses = "font-bold leading-none opacity-70";
	const headersColor = "white";

	return (
		<thead>
			<tr>
				{/* S/No column */}
				{hasSerialNumbers && (
					<th className={thClasses}>
						<Typography variant="small" color={headersColor} className={thTypographyClasses}>
							S/No
						</Typography>
					</th>
				)}

				{/* Other columns */}
				{columns.map((column: TableColumn, index: number) => (
					<th key={index} className={thClasses}>
						<Typography variant="small" color={headersColor} className={thTypographyClasses}>
							{column.label}
						</Typography>
					</th>
				))}

				{/* Actions column */}
				{hasActionsColumn && (
					<th className={thClasses}>
						<Typography variant="small" color={headersColor} className={thTypographyClasses}>
							Actions
						</Typography>
					</th>
				)}
			</tr>
		</thead>
	);
};
