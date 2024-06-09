export const auth = {
	login: "/auth/login",
};

export const dashboard = {
	index: "/dashboard",
};

export const users = {
	create: "/users/create",
	list: "/users",
	details: (userId: string) => "/users/" + userId + "/details",
	update: (userId: string) => "/users/" + userId + "/update",
};

export const books = {
	list: "/books",
};
