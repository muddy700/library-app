//* Data flow: (array/object) => JSON-String => encoded
import { utilService } from ".";

const getKey = (subKey: string) => "LIMS_" + subKey;

export const save = (subKey: string, value: string) => localStorage.setItem(getKey(subKey), utilService.encode(value));

export const get = <T>(subKey: string) => {
	const value = localStorage.getItem(getKey(subKey));

	return value !== null ? (JSON.parse(utilService.decode(value)) as T) : value;
};

export const remove = (subKey: string) => localStorage.removeItem(getKey(subKey));
