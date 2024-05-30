import { storageService, utilService } from ".";
import { AuthInfo } from "@lims/modules/auth/types";
import { User } from "../types";

export const getAuthInfo = () => storageService.get<AuthInfo>(utilService.constants.AUTH_INFO);

export const getPrincipal = (): User | null => getAuthInfo()?.user ?? null;

export const getToken = () => getAuthInfo()?.token ?? null;
