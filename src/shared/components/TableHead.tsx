import { Typography } from "@material-tailwind/react";
import { TableColumn } from "../types";

type TableHeadProps = {
	hasSerialNumbers: boolean;
	hasActions: boolean;
	columns: TableColumn[];
};

export const TableHead = ({ hasSerialNumbers, hasActions, columns }: TableHeadProps) => {
	// Re-used classes
	const thClasses = "border-b border-blue-gray-100 bg-blue-gray-50 p-4";
	const thTypographyClasses = "font-normal leading-none opacity-70";
	const headersColor = "blue-gray";

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
				{hasActions && (
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
