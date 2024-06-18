import { Permission } from "@lims/shared/types";

type TProps = { permissions?: Permission[] };

export const PermissionsList = ({ permissions = [] }: TProps) => {
	if (!permissions.length) return <div className="text-primary-900/90 font-normal">No permissions</div>;

	const resourcesList = [...new Set(permissions.map(({ resourceName }) => resourceName))].sort((a, b) => a.localeCompare(b));

	const getPermissionsByResource = (resource: string) => permissions.filter(({ resourceName }) => resourceName === resource);

	return (
		<div className="grid grid-cols-4 gap-y-5">
			{resourcesList.map((resource) => (
				<div key={resource}>
					<span className="font-semibold">{resource}</span>
					{getPermissionsByResource(resource).map(({ id, description }) => (
						<div className="flex items-center gap-1" key={id}>
							<span className="h-2 w-2 rounded-full bg-green-900/90" />
							<span className="text-primary-900/90 font-normal"> {description}</span>
						</div>
					))}
				</div>
			))}
		</div>
	);
};
