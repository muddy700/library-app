import { Card, CardBody, Typography } from "@material-tailwind/react";

export const CardSkeleton = () => {
	return (
		<Card className="bg-primary-800/50 animate-pulse">
			<CardBody>
				<div className="flex justify-between items-center">
					<Typography className="" variant="h6">
						&nbsp;
					</Typography>
					&nbsp;
				</div>
				<Typography className="font-medium">&nbsp;</Typography>
			</CardBody>
		</Card>
	);
};
