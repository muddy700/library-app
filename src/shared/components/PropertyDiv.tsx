import { ReactNode } from "react";

type FieldProps = { label: string; value: ReactNode };

export const PropertyDiv = ({ label, value }: FieldProps) => {
	return (
		<div>
			<div className="font-semibold">{label}</div>
			<div className="text-primary-900/90 font-normal">{value}</div>
		</div>
	);
};
