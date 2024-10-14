import { PropertyDiv, StatusChip } from "@lims/shared/components";
import { utilService } from "@lims/shared/services";
import { Role } from "@lims/shared/types";

type InfoProps = {
	role?: Role;
};

export const BasicInfo = ({ role }: InfoProps) => {
	if (!role) return <div>No role info.</div>;

	return (
		<div className="flex flex-col gap-5">
			<div className="grid grid-cols-5">
				<PropertyDiv label={"Name"} value={role.name} />
				<PropertyDiv label={"Created At"} value={utilService.formatDate(role.createdAt)} />
				<PropertyDiv label={"Updated At"} value={utilService.formatDate(role.updatedAt)} />
				<PropertyDiv label={"Users"} value={12} />
				<PropertyDiv label={"Status"} value={<StatusChip value={role.active ? "Active" : "Locked"} theme={role.active} />} />
			</div>
			<PropertyDiv label={"Description"} value={role.description} />
		</div>
	);
};
