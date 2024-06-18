import { useQuery } from "@tanstack/react-query";
import { Permission, Role, User } from "../types";
import { apiService } from "../services";
import { Book } from "@lims/modules/books/types";

export const useUserInfo = (userId: string) => useQuery({ queryKey: ["user", userId], queryFn: () => apiService.getById<User>("/users", userId) });

export const useRoleInfo = (roleId: string) => useQuery({ queryKey: [ "role", roleId ], queryFn: () => apiService.getById<Role>("/roles", roleId) });

export const useBookInfo = (bookId: string) => useQuery({ queryKey: ["book", bookId], queryFn: () => apiService.getById<Book>("/books", bookId) });

export const useRoles = () => useQuery({ queryKey: ["roles"], queryFn: () => apiService.getAll<Role>("/roles") });

export const usePermissions = () => useQuery({ queryKey: ["permissions"], queryFn: () => apiService.getWithQuery<Permission>("/permissions", { size: 100 }) });
