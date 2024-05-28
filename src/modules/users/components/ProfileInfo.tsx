import { Card, CardHeader, CardBody, Typography, CardFooter, Button } from "@material-tailwind/react";
import { User } from "../types";
import { variant } from "@material-tailwind/react/types/components/typography";

type ProfileProps = {
	data: User;
};

export const ProfileInfo = ({ data }: ProfileProps) => {
	const rowClasses: string = "grid grid-cols-2 border-b-2 pb-3";
	const columnClasses: string = "flex gap-5";
	const keyVariant: variant = "h6";
	const valueClasses: string = "font-normal";

	const formatDate = (dt?: string): string => dt?.split("T")[0] ?? "--";

	return (
		<div className="flex gap-5">
			<Card className="w-96">
				<CardHeader floated={false} className="h-80">
					<img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" />
				</CardHeader>
				<CardBody className="text-center">
					<Typography variant="h4" color="blue-gray" className="mb-2">
						{data.fullName}
					</Typography>
					<Typography color="blue-gray" className="font-medium" textGradient>
						{data.role.name}
					</Typography>
				</CardBody>
				<CardFooter className="flex justify-center gap-7 pt-2">
					<Button variant="outlined">Edit</Button>
					<Button>Disable</Button>
				</CardFooter>
			</Card>
			<Card className="p-5 w-3/4 flex flex-col gap-10">
				<div className={rowClasses}>
					<div className={columnClasses}>
						<Typography variant={keyVariant}>Full Name: </Typography>
						<Typography className={valueClasses}>{data.fullName}</Typography>
					</div>
					<div className={columnClasses}>
						<Typography variant={keyVariant}>Role: </Typography>
						<Typography className={valueClasses}>{data.role.name}</Typography>
					</div>
				</div>
				<div className={rowClasses}>
					<div className={columnClasses}>
						<Typography variant={keyVariant}>Email: </Typography>
						<Typography className={valueClasses}>{data.email}</Typography>
					</div>
					<div className={columnClasses}>
						<Typography variant={keyVariant}>Email Verified At: </Typography>
						<Typography className={valueClasses}>{formatDate(data.emailVerifiedAt)}</Typography>
					</div>
				</div>
				<div className={rowClasses}>
					<div className={columnClasses}>
						<Typography variant={keyVariant}>Phone Number: </Typography>
						<Typography className={valueClasses}>{data.phoneNumber}</Typography>
					</div>
					<div className={columnClasses}>
						<Typography variant={keyVariant}>Phone Verified At: </Typography>
						<Typography className={valueClasses}>{formatDate(data.phoneVerifiedAt)}</Typography>
					</div>
				</div>
				<div className={rowClasses}>
					<div className={columnClasses}>
						<Typography variant={keyVariant}>Gender: </Typography>
						<Typography className={valueClasses}>{data.gender}</Typography>
					</div>
					<div className={columnClasses}>
						<Typography variant={keyVariant}>Status: </Typography>
						<Typography className={valueClasses}>{data.enabled ? "Active" : "Locked"}</Typography>
					</div>
				</div>
				<div className={rowClasses}>
					<div className={columnClasses}>
						<Typography variant={keyVariant}>Password Changed At: </Typography>
						<Typography className={valueClasses}>{formatDate(data.passwordChangedAt)}</Typography>
					</div>
					<div className={columnClasses}>
						<Typography variant={keyVariant}>Last Login: </Typography>
						<Typography className={valueClasses}>{formatDate(data.passwordChangedAt)}</Typography>
					</div>
				</div>
				<div className={rowClasses}>
					<div className={columnClasses}>
						<Typography variant={keyVariant}>Created At: </Typography>
						<Typography className={valueClasses}>{formatDate(data.createdAt)}</Typography>
					</div>
					<div className={columnClasses}>
						<Typography variant={keyVariant}>Last Updated At: </Typography>
						<Typography className={valueClasses}>{formatDate(data.updatedAt)}</Typography>
					</div>
				</div>
			</Card>
		</div>
	);
};
