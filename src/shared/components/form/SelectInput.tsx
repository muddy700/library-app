import { Option, Select } from "@material-tailwind/react";
import { InputError } from "../InputError";
import { formService, utilService } from "@lims/shared/services";
import { InputOption } from "@lims/shared/types";
import { size } from "@material-tailwind/react/types/components/select";

type InputProps = {
	label: string;
	options?: InputOption[];
	name?: string;
	onChange: (fieldName: string, value?: string) => void;
	getErrorMessage?: (fieldName: string) => string;
	className?: string;
	isLoading?: boolean;
	disabled?: boolean;
	value?: string;
	size?: size;
};
export const SelectInput = ({ label, name, options = [], value, onChange, isLoading = false, getErrorMessage = () => "", className, size = "lg", disabled = false }: InputProps) => {
	if (!name) name = formService.createInputNameFromLabel(label);

	const hasError = (fieldName: string) => !utilService.isNull(getErrorMessage(fieldName));

	if (isLoading) return <Select label="Loading..." disabled children={""} />;

	return (
		<div className={className}>
			<Select label={label} name={name} value={value} color="teal" size={size} onChange={(value) => onChange(name, value)} error={hasError(name)} disabled={disabled}>
				{options.map((item) => (
					<Option key={item.value} value={item.value}>
						{item.label}
					</Option>
				))}
			</Select>
			<InputError show={hasError(name)} message={getErrorMessage(name)} />
		</div>
	);
};
