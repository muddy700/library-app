export const auth = {
	login: "/auth/login",
};

export const dashboard = {
	index: "/dashboard",
};

const getCommonRoutes = (baseUrl: string) => {
	return {
		create: baseUrl + "/create",
		list: baseUrl,
		details: (resourceId: string) => baseUrl + "/" + resourceId + "/details",
		update: (resourceId: string) => baseUrl + "/" + resourceId + "/update",
	};
};

export const users = { ...getCommonRoutes("/users") };

export const books = { ...getCommonRoutes("/books") };
