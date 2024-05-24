import { XCircleIcon } from "@heroicons/react/24/outline";
import { DialogHeader, Typography, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { useState } from "react";
import { Error, GlobalError, Validation } from "../types";
import { DataDialog } from "./DataDialog";

type BannerProps = {
	data: Error;
};

export const ErrorBanner = ({ data }: BannerProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(true);
	if (!data.timestamp && !data.path) {
		const newError: GlobalError = data as unknown as GlobalError;

		return (
			<DataDialog className="flex flex-col items-center border-t-8 border-red-400" size="md" isOpen={isOpen}>
				<DialogHeader className="flex flex-col text-red-400">
					<XCircleIcon className="h-20 w-20" />
					<Typography variant="h4">{data.title}</Typography>
				</DialogHeader>
				<DialogBody className="font-normal">
					<div>
						<b>Error Code:</b> {newError.status}
					</div>
					<div>
						<b>API:</b> {newError.instance}
					</div>
					<div>
						<b>Description: </b>
						{newError.detail}
					</div>
				</DialogBody>
				<DialogFooter>
					<Button onClick={() => setIsOpen(false)} className="bg-secondary-500">
						Ok
					</Button>
				</DialogFooter>
			</DataDialog>
		);
	}

	return (
		<DataDialog className="flex flex-col items-center border-t-8 border-red-400" size="md" isOpen={isOpen}>
			<DialogHeader className="flex flex-col text-red-400">
				<XCircleIcon className="h-20 w-20" />
				<Typography variant="h4">{data.title}</Typography>
			</DialogHeader>
			<DialogBody className="font-normal">
				<div>
					<b>Trace ID:</b> {data.traceId}
				</div>
				<div>
					<b>Error Code :</b> {data.status}
				</div>
				<div>
					<b>API:</b> {data.path}
				</div>
				<div>
					<b>Description: </b>
					{data.description}
				</div>
				{data.validations && (
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
				<Button onClick={() => setIsOpen(false)} className="bg-secondary-500">
					Ok
				</Button>
			</DialogFooter>
		</DataDialog>
	);
};
