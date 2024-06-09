import { UserDto } from "@lims/modules/users/schemas";
import { Page, PrimaryData } from "../types";

export const userForm: UserDto = {
	fullName: "",
	email: "",
	phoneNumber: "",
	roleId: "",
	gender: "",
};

export const getDataPage = <T extends PrimaryData>(): Page<T> => ({ totalItems: 0, currentSize: 0, totalPages: 0, currentPage: 0, items: [] });
