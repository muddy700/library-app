import axios, { AxiosError, AxiosResponse } from "axios";
import { Error, Page, QueryParams } from "../types";
import { dummyDataService } from ".";

const axiosInstance = axios.create({ baseURL: "library-mvp-api/v1" });

// Types declaration
type SystemError = {
	detail: string;
	instance: string;
	status: number;
	title: string;
	type: string;
};

export const getAll = async <T>(endpoint: string) => {
	try {
		return (await axiosInstance.get<Page<T>>(endpoint)).data;
	} catch (error) {
		return handleError(error);
	}
};

export const getWithQuery = async <T>(endpoint: string, params: QueryParams) => {
	try {
		return (await axiosInstance.get<Page<T>>(endpoint, { params })).data;
	} catch (error) {
		return handleError(error);
	}
};

export const getById = async <T>(endpoint: string) => {
	try {
		return (await axiosInstance.get<T>(endpoint)).data;
	} catch (error) {
		return handleError(error);
	}
};

// TODO: Write description for each function as below
/**
 * @description some
 * @param endpoint
 * @param payload
 * @returns
 */
export const post = async <T, D>(endpoint: string, payload: D) => {
	try {
		return (await axiosInstance.post<T, AxiosResponse<T, D>, D>(endpoint, payload)).data;
	} catch (error) {
		return handleError(error);
	}
};

export const patch = async <T, D>(endpoint: string, payload: D) => {
	try {
		return (await axiosInstance.patch<T, AxiosResponse<T, D>, D>(endpoint, payload)).data;
	} catch (error) {
		return handleError(error);
	}
};

export const remove = async <T>(endpoint: string) => {
	try {
		return (await axiosInstance.delete<T>(endpoint)).data;
	} catch (error) {
		return handleError(error);
	}
};

const handleError = (error: unknown) => {
	let errorInfo: Error = dummyDataService.unknownError;
	const { request: requestError, response: responseError } = error as AxiosError<Error>;

	if (responseError) {
		const { data, status } = responseError;

		if (data.timestamp && data.path) errorInfo = { ...data, status };
		else {
			const { detail: description, instance: path, title } = data as unknown as SystemError;
			errorInfo = { ...errorInfo, status, title, description, path };
		}
	} else console.log("Request Error: ", requestError);

	return errorInfo;
};
