import axios, { AxiosError, AxiosResponse } from "axios";
import { Error, Page, QueryParams } from "../types";
import { authService, dummyDataService, utilService } from ".";

const waitingTime: number = 1000;

const defaultConfigs = {
	baseURL: "/lims-api/v1",
	headers: {
		"Content-Type": "application/json",
	},
};

const axiosInstance = axios.create(defaultConfigs);

// Append auth header
axiosInstance.interceptors.request.use((config) => {
	const token = authService.getToken();
	config.headers.Authorization = token ? "Bearer " + token : "";

	return config;
});

// Types declaration
type SystemError = {
	detail: string;
	instance: string;
	status: number;
	title: string;
	type: string;
};

export const getAll = async <T>(endpoint: string) => {
	await utilService.pauseExecution(waitingTime);

	try {
		return (await axiosInstance.get<Page<T>>(endpoint)).data;
	} catch (error) {
		return handleError(error);
	}
};

export const getWithQuery = async <T>(endpoint: string, params: QueryParams) => {
	await utilService.pauseExecution(waitingTime);

	try {
		return (await axiosInstance.get<Page<T>>(endpoint, { params })).data;
	} catch (error) {
		return handleError(error);
	}
};

export const getById = async <T>(endpoint: string, resourceId: string) => {
	await utilService.pauseExecution(waitingTime);

	try {
		return (await axiosInstance.get<T>(endpoint + "/" + resourceId)).data;
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
	await utilService.pauseExecution(waitingTime);

	try {
		return (await axiosInstance.post<T, AxiosResponse<T, D>, D>(endpoint, payload)).data;
	} catch (error) {
		return handleError(error);
	}
};

export const put = async <T, D>(endpoint: string, payload: D) => {
	await utilService.pauseExecution(waitingTime);

	try {
		return (await axiosInstance.put<T, AxiosResponse<T, D>, D>(endpoint, payload)).data;
	} catch (error) {
		return handleError(error);
	}
};

export const remove = async <T>(endpoint: string) => {
	await utilService.pauseExecution(waitingTime);

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

		if (utilService.isNull(data) && status === 403) errorInfo = getForbiddenError(responseError);
		else if (data.timestamp && data.path) errorInfo = { ...data, status };
		else {
			const { detail: description, instance: path, title } = data as unknown as SystemError;
			errorInfo = { ...errorInfo, status, title, description, path };
		}
	} else console.log("Request Error: ", requestError);

	return errorInfo;
};

const getForbiddenError = (response: AxiosResponse) => {
	return {
		status: response.status,
		title: response.statusText,
		description: "You're not authorized to view this resource(s).",
		path: "/api/v1" + response.config.url,
		traceId: "TID-forbidden",
	} as Error;
};
