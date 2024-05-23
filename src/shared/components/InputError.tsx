import { Typography } from "@material-tailwind/react";

type InputErrorProps = {
	show: boolean;
	message: string;
};

export const InputError = ({ show, message }: InputErrorProps) => {
	if (!show) return;
	
	return (
		<Typography variant="small" className="pl-1 font-normal text-red-500">
			{message}
		</Typography>
	);
};
