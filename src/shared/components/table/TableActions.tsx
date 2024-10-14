import { FunnelIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { TableActionEnum } from "@lims/shared/enums";
import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";

type TProps = {
	entityName: string;
	isActionVisible: (actionId: TableActionEnum) => boolean;
	actionHandler: (actionId: TableActionEnum, data: unknown) => void;
};

export const TableActions = ({ entityName, actionHandler, isActionVisible }: TProps) => {
	const [searchQuery, setSearchQuery] = useState<string>("");

	const { NEW, FILTER, SEARCH } = TableActionEnum;
	const buttonClasses: string = "flex items-center gap-3 text-primary-900 py-2 px-3";

	return (
		<div className="flex items-center justify-between">
			<div className="flex gap-3 items-center">
				{isActionVisible(NEW) && (
					<Button className={buttonClasses} variant="outlined" onClick={() => actionHandler(NEW, null)}>
						<PlusIcon className="h-5 w-5" strokeWidth={2} />
						New {entityName}
					</Button>
				)}
				{isActionVisible(FILTER) && (
					<Button className={buttonClasses} variant="outlined" onClick={() => actionHandler(FILTER, null)}>
						<FunnelIcon className="w-5 h-5" strokeWidth={2} />
						Filter
					</Button>
				)}
			</div>
			<div className="w-72">
				{isActionVisible(SEARCH) && (
					<Input
						label="Search"
						icon={<MagnifyingGlassIcon className="h-5 w-5 hover:cursor-pointer" onClick={() => actionHandler(SEARCH, searchQuery)} />}
						onChange={(e) => setSearchQuery(e.target.value)}
						color="teal"
						size="lg"
					/>
				)}
			</div>
		</div>
	);
};
