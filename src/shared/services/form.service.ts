import { ZodError } from "zod";
import { Validation } from "../types";

// TODO: Review the approach below and enhance
export const extractErrors = (result: ZodError): Validation[] => {
	const formErrors: Validation[] = [];
	const formattedError = result.format();

	Object.keys(formattedError)
		.filter((key) => key !== "_errors")
		.forEach((fieldName) => formErrors.push({ fieldName, errorMessage: (formattedError[fieldName as never] as { _errors: string[] })._errors[0] }));

	return formErrors;
};

export const removeInputError = (fieldName: string, formErrors: Validation[], stateHandler: (values: Validation[]) => void): void => {
	stateHandler(formErrors.filter((error) => error.fieldName !== fieldName));
};

export const getErrorMessage = (fieldName: string, formErrors: Validation[]) => getItem(fieldName, formErrors)?.errorMessage ?? "";

export const hasError = (fieldName: string, formErrors: Validation[]) => (getItem(fieldName, formErrors) ? true : false);

const getItem = (fieldName: string, formErrors: Validation[]) => formErrors.find((error) => error.fieldName === fieldName);
