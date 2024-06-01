import { Input } from "@material-tailwind/react";
import { InputError } from "../InputError";
import { FormEvent } from "react";
import { formService, utilService } from "@lims/shared/services";

type InputProps = {
	label: string;
	name?: string;
	type?: string;
	onChange?: (e: FormEvent<HTMLInputElement>) => void;
	getErrorMessage?: (fieldName: string) => string;
	className?: string;
	required?: boolean;
	value?: string;
};

export const TextInput = ({ label, name, type = "text", value, onChange, getErrorMessage = () => "", className, required = true }: InputProps) => {
	if (!name) name = formService.createInputNameFromLabel(label);

	const hasError = (fieldName: string) => !utilService.isNull(getErrorMessage(fieldName));

	return (
		<div className={className}>
			<Input label={label} name={name} type={type} onChange={onChange} value={value} color="teal" size="lg" error={hasError(name)} required={required} />
			<InputError show={hasError(name)} message={getErrorMessage(name)} />
		</div>
	);
};
