import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { IError, IPage, Permission, QueryParams, Role, User } from "../types";
import { apiService } from "../services";
import { Book } from "@lims/modules/books/types";

export const useUserInfo = (userId: string) => useQuery({ queryKey: ["user", userId], queryFn: () => apiService.getById<User>("/users", userId) });

export const useRoleInfo = (roleId: string) => useQuery({ queryKey: ["role", roleId], queryFn: () => apiService.getById<Role>("/roles", roleId) });

export const useBookInfo = (bookId: string) => useQuery({ queryKey: ["book", bookId], queryFn: () => apiService.getById<Book>("/books", bookId) });

export const useRoles = (params: QueryParams) =>
	useQuery<IPage<Role>, IError>({ queryKey: ["roles", params], queryFn: () => apiService.getWithQuery<Role>("/roles", params), placeholderData: keepPreviousData });

export const usePermissions = () => useQuery({ queryKey: ["permissions"], queryFn: () => apiService.getWithQuery<Permission>("/permissions", { size: 100 }) });
