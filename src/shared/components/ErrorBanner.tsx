import { XCircleIcon } from "@heroicons/react/24/outline";
import { DialogHeader, Typography, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { Error, Validation } from "../types";
import { DataDialog } from "./DataDialog";
import { variant } from "@material-tailwind/react/types/components/typography";

type BannerProps = {
	data?: Error;
	onClose?: () => void;
};

export const ErrorBanner = ({ data, onClose = () => console.log("Error Dialog Closed.") }: BannerProps) => {
	const rowClasses: string = "flex gap-5 border-b-2 py-3";
	const keyVariant: variant = "h6";
	const valueClasses: string = "font-normal";

	if (!data) return;

	return (
		<DataDialog className="flex flex-col items-center border-t-8 border-red-400" size="md">
			<DialogHeader className="flex flex-col text-red-400">
				<XCircleIcon className="h-20 w-20" />
				<Typography variant="h4">{data.title}</Typography>
			</DialogHeader>
			<DialogBody className="font-normal">
				<div className={rowClasses}>
					<Typography variant={keyVariant}>Trace ID: </Typography>
					<Typography className={valueClasses}>{data.traceId}</Typography>
				</div>
				<div className={rowClasses}>
					<Typography variant={keyVariant}>Error Code: </Typography>
					<Typography className={valueClasses}>{data.status}</Typography>
				</div>
				<div className={rowClasses}>
					<Typography variant={keyVariant}>API: </Typography>
					<Typography className={valueClasses}>{data.path}</Typography>
				</div>
				<div className={rowClasses}>
					<Typography variant={keyVariant}>Description: </Typography>
					<Typography className={valueClasses + " text-red-400/90"}>{data.description}</Typography>
				</div>
				{data.validations && data.validations.length > 0 && (
					<div>
						<b>Validations: </b>
						<div className="pl-10">
							{data.validations.map((validation: Validation) => (
								<div key={validation.fieldName}>
									<b>{validation.fieldName}</b>: {validation.errorMessage}
								</div>
							))}
						</div>
					</div>
				)}
			</DialogBody>
			<DialogFooter>
				<Button onClick={() => onClose()} className="bg-secondary-500">
					Ok
				</Button>
			</DialogFooter>
		</DataDialog>
	);
};
