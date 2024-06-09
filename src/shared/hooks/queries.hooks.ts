import { useQuery } from "@tanstack/react-query";
import { Role, User } from "../types";
import { apiService } from "../services";
import { Book } from "@lims/modules/books/types";

export const useUserInfo = (userId: string) => useQuery({ queryKey: ["user", userId], queryFn: () => apiService.getById<User>("/users", userId) });

export const useBookInfo = (bookId: string) => useQuery({ queryKey: ["book", bookId], queryFn: () => apiService.getById<Book>("/books", bookId) });

export const useRoles = () => useQuery({ queryKey: ["roles"], queryFn: () => apiService.getAll<Role>("/roles") });
