import { Button, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import { Success } from "../types";
import { DataDialog } from "./DataDialog";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

type BannerProps = {
	data: Success;
	actionHandler: (actionId: number) => void;
};

export const SuccessBanner = ({ data, actionHandler }: BannerProps) => {
	const itWasNotDeletingAction = () => !data.message.includes("deleted");

	return (
		<DataDialog className="flex flex-col items-center border-t-8 border-green-600">
			<DialogHeader className="flex flex-col text-green-600">
				<CheckBadgeIcon className="h-20 w-20" />
				<Typography variant="h4">Congratulations!</Typography>
			</DialogHeader>
			<DialogBody className="font-normal">{data.message}</DialogBody>
			<DialogFooter className="flex gap-5 justify-center">
				{itWasNotDeletingAction() && (
					<Button variant="outlined" onClick={() => actionHandler(1)} className="text-secondary-600 border-secondary-600 ">
						View Task
					</Button>
				)}
				<Button onClick={() => actionHandler(2)} className="bg-primary-600">
					Add New
				</Button>
				<Button variant="outlined" onClick={() => actionHandler(3)} className="text-primary-600 border-primary-600">
					Todos List
				</Button>
			</DialogFooter>
		</DataDialog>
	);
};
