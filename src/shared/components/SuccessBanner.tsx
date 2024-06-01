import { Button, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import { Success } from "../types";
import { DataDialog } from "./DataDialog";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { SuccessActionEnum } from "../enums";
import { utilService } from "../services";

type BannerProps = {
	data?: Success;
	entityName?: string;
	actions?: SuccessActionEnum[];
	actionHandler: (actionId: SuccessActionEnum) => void;
};

export const SuccessBanner = ({ data, entityName = "Entity", actions = [], actionHandler }: BannerProps) => {
	const { ADD_NEW, VIEW_RESOURCE, LIST_RESOURCES } = SuccessActionEnum;

	const isVisible = (actionId: SuccessActionEnum) => (actions.find((action) => action === actionId) ? true : false);

	if (!data) return;

	return (
		<DataDialog className="flex flex-col items-center border-t-8 border-green-600">
			<DialogHeader className="flex flex-col text-green-600">
				<CheckBadgeIcon className="h-20 w-20" />
				<Typography variant="h4">Congratulations!</Typography>
			</DialogHeader>
			<DialogBody className="font-normal">{data.message}</DialogBody>
			<DialogFooter className="flex gap-5 justify-center">
				{isVisible(VIEW_RESOURCE) && (
					<Button variant="outlined" onClick={() => actionHandler(VIEW_RESOURCE)} className="text-secondary-600 border-secondary-600 ">
						View {entityName}
					</Button>
				)}

				{isVisible(ADD_NEW) && (
					<Button onClick={() => actionHandler(ADD_NEW)} className="bg-primary-600">
						Add New
					</Button>
				)}

				{isVisible(LIST_RESOURCES) && (
					<Button variant="outlined" onClick={() => actionHandler(LIST_RESOURCES)} className="text-primary-600 border-primary-600">
						{utilService.getEntityPlural(entityName)} List
					</Button>
				)}
			</DialogFooter>
		</DataDialog>
	);
};
