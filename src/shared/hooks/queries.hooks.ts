import { useQuery } from "@tanstack/react-query";
import { Role, User } from "../types";
import { apiService } from "../services";

export const useUserInfo = (userId: string) => useQuery({ queryKey: ["user", userId], queryFn: () => apiService.getById<User>("/users", userId) });

export const useRoles = () => useQuery({ queryKey: ["roles"], queryFn: () => apiService.getAll<Role>("/roles") });
