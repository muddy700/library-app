import { Page } from "@lims/shared/layouts";
import { IError, NavigationPath, Success } from "@lims/shared/types";
import { apiService, routeService, utilService } from "@lims/shared/services";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import { variant } from "@material-tailwind/react/types/components/typography";
import { PagePlaceholder, StatusChip, SuccessBanner } from "@lims/shared/components";
import { SuccessActionEnum } from "@lims/shared/enums";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@lims/shared/services/util.service";
import { useUserInfo } from "@lims/shared/hooks";

type TEnabled = { enabled: boolean };

export const UserDetails = () => {
	const { userId } = useParams();
	const { isLoading, data: userInfo, error: fetchingError } = useUserInfo(userId ?? "--");
	const { mutate, isPending, data: response, error: mutationError, reset } = useMutation({ mutationFn: (payload: TEnabled) => apiService.put<Success, TEnabled>("/users/" + userId, payload) });

	const navigate = useNavigate();
	const navPaths: NavigationPath[] = [{ label: "users", url: "/users" }, { label: "user-details" }];

	const { ADD_NEW, VIEW_RESOURCE, LIST_RESOURCES } = SuccessActionEnum;
	const successActions = [ADD_NEW, VIEW_RESOURCE, LIST_RESOURCES];

	const rowClasses: string = "grid grid-cols-2 border-b-2 pb-3";
	const columnClasses: string = "flex gap-5";
	const keyVariant: variant = "h6";
	const valueClasses: string = "font-normal";

	const formatDate = (dt?: string): string => dt?.split("T")[0] ?? "--";

	const handleSuccessActions = (actionId: SuccessActionEnum) => {
		// View details of the updated user
		if (actionId === VIEW_RESOURCE) navigate("#");
		// Show user creation form
		else if (actionId === ADD_NEW) navigate(routeService.users.create);
		// Show users list
		else if (actionId === LIST_RESOURCES) navigate(routeService.users.list);
		else console.log("Success Action Not Found!");

		// Reset the mutation to its initial state
		reset();
		queryClient.invalidateQueries({ queryKey: ["user", userId] });
	};

	const updateUser = () => mutate({ enabled: !userInfo?.enabled });

	const isActive = () => userInfo?.enabled ?? false;

	const getApiError = () => (fetchingError || mutationError ? ((fetchingError || mutationError) as unknown as IError) : undefined);

	return (
		<Page title="User Details" subTitle="View details of a single user" paths={navPaths} errorInfo={getApiError()} isLoading={isLoading}>
			{/* Success Banner */}
			<SuccessBanner data={response} actionHandler={handleSuccessActions} entityName="User" actions={successActions} />

			{/* Content Placeholder */}
			<PagePlaceholder isOpen={utilService.isNull(userInfo)} />

			{userInfo && (
				<div className="flex gap-5">
					<Card className="w-96">
						<CardHeader floated={false} className="h-80">
							<img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" />
						</CardHeader>
						<CardBody className="text-center">
							<Typography variant="h5" color="blue-gray" className="mb-2">
								{userInfo.fullName}
							</Typography>
							<Typography color="blue-gray" className="font-medium" textGradient>
								{userInfo.role.name}
							</Typography>
						</CardBody>
						<CardFooter className="flex justify-center gap-7 pt-2">
							<Button variant="outlined" onClick={() => navigate(routeService.users.update(userId ?? "--"))} className=" text-primary-600 border-primary-600">
								Update
							</Button>
							<Button loading={isPending} onClick={() => updateUser()} className={`${isActive() ? "bg-secondary-800" : "bg-primary-800"}`}>
								{isPending ? "Loading..." : isActive() ? "Disable" : "Activate"}
							</Button>
						</CardFooter>
					</Card>
					<Card className="p-5 w-3/4 flex flex-col gap-10">
						<div className={rowClasses}>
							<div className={columnClasses}>
								<Typography variant={keyVariant}>Full Name: </Typography>
								<Typography className={valueClasses}>{userInfo.fullName}</Typography>
							</div>
							<div className={columnClasses}>
								<Typography variant={keyVariant}>Role: </Typography>
								<Typography className={valueClasses}>{userInfo.role.name}</Typography>
							</div>
						</div>
						<div className={rowClasses}>
							<div className={columnClasses}>
								<Typography variant={keyVariant}>Email: </Typography>
								<Typography className={valueClasses}>{userInfo.email}</Typography>
							</div>
							<div className={columnClasses}>
								<Typography variant={keyVariant}>Email Verified At: </Typography>
								<Typography className={valueClasses}>{formatDate(userInfo.emailVerifiedAt)}</Typography>
							</div>
						</div>
						<div className={rowClasses}>
							<div className={columnClasses}>
								<Typography variant={keyVariant}>Phone Number: </Typography>
								<Typography className={valueClasses}>{userInfo.phoneNumber}</Typography>
							</div>
							<div className={columnClasses}>
								<Typography variant={keyVariant}>Phone Verified At: </Typography>
								<Typography className={valueClasses}>{formatDate(userInfo.phoneVerifiedAt)}</Typography>
							</div>
						</div>
						<div className={rowClasses}>
							<div className={columnClasses}>
								<Typography variant={keyVariant}>Gender: </Typography>
								<Typography className={valueClasses}>{userInfo.gender}</Typography>
							</div>
							<div className={columnClasses}>
								<Typography variant={keyVariant}>Status: </Typography>
								<StatusChip theme={isActive()} value={isActive() ? "Active" : "Locked"} />
							</div>
						</div>
						<div className={rowClasses}>
							<div className={columnClasses}>
								<Typography variant={keyVariant}>Password Changed At: </Typography>
								<Typography className={valueClasses}>{formatDate(userInfo.passwordChangedAt)}</Typography>
							</div>
							<div className={columnClasses}>
								<Typography variant={keyVariant}>Last Login: </Typography>
								<Typography className={valueClasses}>{formatDate(userInfo.passwordChangedAt)}</Typography>
							</div>
						</div>
						<div className={rowClasses}>
							<div className={columnClasses}>
								<Typography variant={keyVariant}>Created At: </Typography>
								<Typography className={valueClasses}>{formatDate(userInfo.createdAt)}</Typography>
							</div>
							<div className={columnClasses}>
								<Typography variant={keyVariant}>Last Updated At: </Typography>
								<Typography className={valueClasses}>{formatDate(userInfo.updatedAt)}</Typography>
							</div>
						</div>
					</Card>
				</div>
			)}
		</Page>
	);
};
