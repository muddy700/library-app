import { DataDialog, Loader } from "@lims/shared/components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthInfo, EmailVerificationResult } from "../types";
import { IError } from "@lims/shared/types";
import { useQuery } from "@tanstack/react-query";
import { apiService, routeService, storageService, utilService } from "@lims/shared/services";
import { Button, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export const EmailVerification = () => {
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const [searchParams] = useSearchParams();

	const navigate = useNavigate();
	const verificationToken = searchParams.get("token");

	const { isLoading, data, error } = useQuery<EmailVerificationResult, IError>({
		queryKey: ["verify-email", verificationToken],
		queryFn: () => apiService.getById<EmailVerificationResult>("/auth", "verify-token?token=" + verificationToken),
	});

	const titleColor = data ? "text-green-600" : "text-red-400";
	const borderColor = data ? "border-green-600" : "border-red-400";

	const actionHandler = () => {
		setIsOpen(false);

		if (data) {
			// Means ==> Email verified successful.
			const { email, token: authToken, expiresIn } = data;

			storeAuthInfo(authToken, expiresIn);
			navigate(routeService.auth.passwordSetup + utilService.getQueryString({ email, token: verificationToken }, true));
		}
	};

	const storeAuthInfo = (authToken: string, expiryTime: number) => {
		const authInfo = {
			token: authToken,
			expiresIn: expiryTime,
			user: undefined,
		} as unknown as AuthInfo;

		storageService.save(utilService.constants.AUTH_INFO, JSON.stringify(authInfo));
	};

	return (
		<div className="h-[100vh] flex items-center justify-center bg-secondary-200">
			{isLoading && (
				<div className="flex flex-col gap-y-8 items-center">
					<Loader />
					<span>Please Wait...</span>
				</div>
			)}

			{!isLoading && (error || data) && (
				<DataDialog className={"flex flex-col items-center border-t-8 " + borderColor} size="md" isOpen={isOpen}>
					<DialogHeader className={"flex flex-col " + titleColor}>
						{data ? <CheckBadgeIcon className="h-20 w-20" /> : <XCircleIcon className="h-20 w-20" />}
						<Typography variant="h4">{data ? "Congratulations!" : error?.title}</Typography>
					</DialogHeader>
					<DialogBody className="font-normal">
						{data ? (
							<span>{data.message}</span>
						) : (
							<div className="flex gap-5 border-b-2 py-3">
								<Typography variant="h6">Description: </Typography>
								<Typography className="font-normal text-red-400/90">{error?.description}</Typography>
							</div>
						)}
					</DialogBody>
					<DialogFooter>
						<Button onClick={actionHandler} className="bg-secondary-500">
							{data ? "Continue" : "Resend"}
						</Button>
					</DialogFooter>
				</DataDialog>
			)}
		</div>
	);
};
