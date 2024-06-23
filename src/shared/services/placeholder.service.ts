import { UserDto } from "@lims/modules/users/schemas";
import { IPage, PrimaryData, QueryParams } from "../types";

export const userForm: UserDto = {
	fullName: "",
	email: "",
	phoneNumber: "",
	roleId: "",
	gender: "",
};

export const getDataPage = <T extends PrimaryData>(): IPage<T> => ({ totalItems: 0, currentSize: 5, totalPages: 0, currentPage: 0, items: [] });

export const defaultQueryParams: QueryParams = { size: 5, page: 0 };
