import axios, { AxiosError, AxiosResponse } from "axios";
import { BaseError, Page, QueryParams } from "../types";

const axiosInstance = axios.create({ baseURL: "library-mvp-api/v1" });

export const getAll = async <T>(endpoint: string) => {
	try {
		return (await axiosInstance.get<Page<T>>(endpoint)).data;
	} catch (error) {
		return handleError(error as AxiosError);
	}
};

export const getWithQuery = async <T>(endpoint: string, params: QueryParams) => {
	try {
		return (await axiosInstance.get<Page<T>>(endpoint, { params })).data;
	} catch (error) {
		return handleError(error as AxiosError);
	}
};

export const getById = async <T>(endpoint: string) => {
	try {
		return (await axiosInstance.get<T>(endpoint)).data;
	} catch (error) {
		return handleError(error as AxiosError);
	}
};

export const post = async <T, D>(endpoint: string, payload: D) => {
	try {
		return (await axiosInstance.post<T, AxiosResponse<T, D>, D>(endpoint, payload)).data;
	} catch (error) {
		return handleError(error as AxiosError);
	}
};

export const patch = async <T, D>(endpoint: string, payload: D) => {
	try {
		return (await axiosInstance.patch<T, AxiosResponse<T, D>, D>(endpoint, payload)).data;
	} catch (error) {
		return handleError(error as AxiosError);
	}
};

export const remove = async <T>(endpoint: string) => {
	try {
		return (await axiosInstance.delete<T>(endpoint)).data;
	} catch (error) {
		return handleError(error as AxiosError);
	}
};

const handleError = (error: AxiosError): void => {
	let errorTitle: string = "API Service Error: ";
	const { request: requestError, response: responseError } = error as AxiosError<BaseError>;

	if (responseError) errorTitle += responseError.data.title;
	else errorTitle += requestError.data;

	// return errorTitle;
	console.log(errorTitle);
};
